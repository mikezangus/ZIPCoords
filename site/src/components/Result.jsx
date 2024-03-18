import React from "react";
import styles from "../styles/Field.module.css";


function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
};


function PrintResult({ output, outputType }) {
    const { zip, lat, lon } = output[0];
    let resultTypeStr
    let resultStr
    outputType === "ZIP"
        ? (
            resultTypeStr = "ZIP Code",
            resultStr = zip
        )
        : (
            resultTypeStr = "Coordinates",
            resultStr = `${lat}, ${lon}`
        )
    return (
        <>
            <div style={{ fontWeight: "bold" }}>
                {resultTypeStr}
            </div>
            <div
                onClick={() => copyToClipboard(resultStr)}
                style={{cursor: "pointer"}}
                title="Click to copy"
            >
                {resultStr}
            </div>
        </>
    );
};


export default function Result({ output, outputType }) {
    return (
        <div className={styles.fieldContainer}>
            <div className={styles.fieldBox}>
                <div className={styles.fieldText}>
                    <PrintResult
                        output={output}
                        outputType={outputType}
                    />
                </div>
            </div>
        </div>
    );
};
