export default async function fetchResult(input, inputType, handleResult) {
    try {
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        const params = new URLSearchParams(
            inputType === "ZIP"
                ? `zip=${input}`
                : `lat=${input.split(",")[0]}&lon=${input.split(",")[1]}`
        );
        const url = `${baseURL}/api/client?${params}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const rawOutput = await response.json();
        handleResult(inputType, { rawOutput });
    } catch (err) {
        console.error("Error: ", err);
    }
};
