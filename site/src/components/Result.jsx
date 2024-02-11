import React from "react";
import "../css/result.css"



export default function Result({ output, outputType }) {
    console.log("OUTPUT FROM RESULT", output)
    const { zip, lat, lon } = output[0];

    return (
        <div className="result">
            {outputType === "ZIP"
                ? (
                    <div>
                        <div>ZIP Code for Coordinates {lat}, {lon}</div>
                        {zip}
                    </div>
                ) : (
                    <div>
                        <div>Coordinates for ZIP Code {zip}</div>
                        {lat}, {lon}
                    </div>
                )
            }

        </div>
    );

}