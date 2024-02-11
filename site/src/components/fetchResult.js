export default async function fetchResult(input, inputType, handleResult) {
    try {
        const params = new URLSearchParams(
            inputType === "ZIP"
                ? `zip=${input}`
                : `lat=${input.split(",")[0]}&lon=${input.split(",")[1]}`
        );
        const url = `http://localhost:4001/client?${params.toString()}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const rawOutput = await response.json();
        handleResult(inputType, { rawOutput })
    } catch (err) {
        console.error("Error: ", err);
    }
};
