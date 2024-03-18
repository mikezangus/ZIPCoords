import React, { useState } from "react";
import fetchResult from "./fetchResult";
import determineType from "./determineType"
import styles from "../styles/Field.module.css";


function Renderer({ input, handleChange }) {
    return (
        <div className={styles.fieldContainer}>
            <div className={styles.fieldBox}>
                <div className={styles.fieldText}>
                    <input
                        type="text"
                        placeholder="🔎  Enter a ZIP code or set of coordinates"
                        value={input}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};


export default function Search({ handleResult }) {
    const [input, setInput] = useState("");
    const handleChange = (event) => {
        const input = event.target.value;
        setInput(input);
        if (input) {
            fetchResult(input, handleResult);
        }
    };
    return (
        <Renderer
            input={input}
            handleChange={handleChange}
        />
    );
};
