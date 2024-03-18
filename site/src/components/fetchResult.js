import determineType from "./determineType";


export default async function fetchResult(input, handleResult) {
    const { type, value } = determineType(input);
    if (type === "UNKNOWN" || !value) {
        return;
    }
    try {
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        let params;
        if (type === "ZIP") {
            params = new URLSearchParams({
                zip: value
            });
        } else {
            const [lat, lon] = value.split(",")
            params = new URLSearchParams({
                lat: lat.trim(),
                lon: lon.trim()
            });
        }
        const url = `${baseURL}/api/client?${params.toString()}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                "Network response was not ok"
            );
        }
        const rawOutput = await response.json();
        handleResult(type, { rawOutput });
    } catch (err) {
        console.error("Error: ", err);
    }
};
