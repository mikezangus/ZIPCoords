export default function determineType(input) {

    const zipRegex = /^\d{5}(-\d{4})?$/;
    const coordRegex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;

    if (zipRegex.test(input)) {
        return "ZIP"
    }
    else if (coordRegex.test(input)) {
        return "COORDS"
    }
    else {
        return "UNKNOWN"
    }

};