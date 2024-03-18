import convertCoordsToDD from "./convertCoordsToDD";


export default function determineType(input) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (zipRegex.test(input)) {
        return {
            type: "ZIP",
            value: input
        };
    }
    const convertedCoords = convertCoordsToDD(input);
    if (convertedCoords) {
        return {
            type: "COORDS",
            value: convertedCoords.join(",")
        };
    }
    return {
        type: "UNKNOWN",
        value: null
    };
};
