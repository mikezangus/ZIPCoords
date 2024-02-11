import json
import pandas as pd
import pymongo
import os


current_dir = os.path.dirname(__file__)


def load_df() -> pd.DataFrame:
    path = os.path.join(current_dir, "locations.csv")
    df = pd.read_csv(
        filepath_or_buffer = path,
        dtype = {"ZIP": str}
    )
    return df


def format_coords(df: pd.DataFrame) -> pd.DataFrame:
    df["COORDS"] = df.apply(
        lambda row: {
            "type": "Point",
            "coordinates": [
                row["LON"],
                row["LAT"]
            ]
        }
        if pd.notnull(row["LAT"]) and pd.notnull(row["LON"])
        else None, axis = 1
    )
    df.drop(
        columns = ["LAT", "LON"],
        inplace = True
    )
    return df


def get_mongo() -> tuple[str, str]:
    dir = os.path.dirname(current_dir)
    path = os.path.join(dir, "config.json")
    with open(path, "r") as config_file:
        config = json.load(config_file)
    db_name = config["database"]
    uri = f"mongodb+srv://{config['username']}:{config['password']}@{config['cluster']}.{config['id']}.mongodb.net/{db_name}?retryWrites=true&w=majority"
    return uri, db_name


def upload_df(df: pd.DataFrame, uri: str, db_name: str) -> None:
    print("Started uploading")
    client = pymongo.MongoClient(uri)
    db = client[db_name]
    collection = db["locations"]
    records = df.to_dict("records")
    collection.insert_many(records)
    client.close()
    print("Finished uploading")
    return


def main():
    df = load_df()
    df = format_coords(df)
    uri, db_name = get_mongo()
    upload_df(df, uri, db_name)


if __name__ == "__main__":
    main()
