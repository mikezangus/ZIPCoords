import os
import requests
from typing import Tuple


def generate_all_zip_codes() -> list:
    zip_codes = [f"{i:05d}" for i in range (500, 100000)]
    return zip_codes


def get_coordinates(session: requests.Session, zip_code: str) -> Tuple[float | None, float | None]:
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "postalcode": zip_code,
        "countrycodes": "us",
        "format": "json",
        "limit": 1
    }
    try:
        response = session.get(
            url,
            params = params,
            timeout = 60
        )
        response.raise_for_status()
        data = response.json()
        if data:
            lat = float(data[0]["lat"])
            lon = float(data[0]["lon"])
            return lat, lon
    except Exception as e:
        print(f"{zip_code} | Error:", e)
    return None, None


def append_file(zip_code: str, lat: float, lon: float) -> None:
    path = "locations.csv"
    with open(path, "a") as f:
        header = "ZIP,LAT,LON\n" if os.stat(path).st_size == 0 else ""
        line = f"{zip_code},{lat},{lon}\n"
        f.write(header + line)
    return


def get_locations(zip_codes: list) -> None:
    session = requests.Session()
    zip_code_count = f"{len(zip_codes):,}"
    for zip_code in zip_codes:
        lat, lon = get_coordinates(session, zip_code)
        if lat and lon:
            append_file(zip_code, lat, lon)
    print(f"Finished writing {zip_code_count} locations")
    return


def main():
    zip_codes = generate_all_zip_codes()
    get_locations(zip_codes)


if __name__ == "__main__":
    main()
