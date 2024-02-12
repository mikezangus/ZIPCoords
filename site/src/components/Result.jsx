import React from "react";
import "../css/result.css";


export default function Result({ output, outputType }) {

    const { zip, lat, lon } = output[0];

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="result">
            {outputType === "ZIP"
                ? (
                    <div>
                        <span>ZIP Code: </span>
                        <span
                            onClick={() => copyToClipboard(`${zip}`)}
                            style={{cursor: "pointer"}}
                            title="Click to copy"
                        >
                            {zip}
                        </span>
                    </div>
                )
                : (
                    <div>
                        <span>Coordinates: </span>
                        <br></br>
                        <span
                            onClick={() => copyToClipboard(`${lat}, ${lon}`)}
                            style={{cursor: "pointer"}}
                            title="Click to copy"
                        >
                            {lat}, {lon}
                        </span>
                    </div>
                )
            }
        </div>
    );

};