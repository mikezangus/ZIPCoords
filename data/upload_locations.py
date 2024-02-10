import json
import pandas as pd
import pymongo
import os
from pathlib import Path


def load_df() -> pd.DataFrame:
    current_dir = os.path.dirname(__file__)
    path = os.path.join(current_dir, "locations.csv")
    df = pd.read_csv(
        filepath_or_buffer = path,
        dtype = {"ZIP": str}
    )
    return df


def convert_to_geojson(df: pd.DataFrame) -> pd.DataFrame:
    df["COORDS"] = df.apply(
        lambda row: {
            "type": "Point",
            "COORDS": [
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


def get_mongo() -> str:
    data_dir = Path(__file__).resolve().parent
    project_dir = str(data_dir.parent)
    path = os.path.join(project_dir, "config.json")
    with open(path, "r") as config_file:
        config = json.load(config_file)
    db_name = config["database"]
    uri = f"mongodb+srv://{config['username']}:{config['password']}@{config['cluster']}.{config['id']}.mongodb.net/{db_name}?retryWrites=true&w=majority"
    print(uri)
    return uri, db_name


def upload_df(df: pd.DataFrame, uri: str, db_name: str) -> None:
    print("Started uploading data")
    client = pymongo.MongoClient(uri)
    db = client[db_name]
    collection = db["locations"]
    records = df.to_dict("records")
    collection.insert_many(records)
    client.close()
    print("Finished uploading data")
    return


def main():
    df = load_df()
    df = convert_to_geojson(df)
    uri, db_name = get_mongo()
    upload_df(df, uri, db_name)


if __name__ == "__main__":
    main()
