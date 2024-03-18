function convertDMSToDD(degrees, minutes, seconds, direction) {
    let dd = parseInt(degrees) + parseFloat(minutes) / 60 + parseFloat(seconds) / (3600);
    if (direction === "S" || direction === "W") {
        dd *= -1;
    }
    return dd;
};


export default function convertCoordsToDD(input) {
    const ddRegex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
    const dmsRegex = /^(\d{1,3})°(\d{1,2})'(\d{1,2}(\.\d+)?)\"([NS])\s+(\d{1,3})°(\d{1,2})'(\d{1,2}(\.\d+)?)\"([EW])$/;
    if (ddRegex.test(input)) {
        return input
            .split(",")
            .map(coord => parseFloat(coord.trim()));
    } else if (dmsRegex.test(input)) {
        const match = input.match(dmsRegex);
        const lat = convertDMSToDD(
            match[1],
            match[2],
            match[3],
            match[5]
        );
        const lon = convertDMSToDD(
            match[6],
            match[7],
            match[8],
            match[10]
        );
        return [lat, lon]
    }
    return null;
};
