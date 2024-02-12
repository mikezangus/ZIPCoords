import React, { useState } from "react";
import fetchResult from "./fetchResult";
import determineType from "./determineType"
import "../css/search.css"


export default function Search({ handleResult }) {

    const [input, setInput] = useState("");

    const handleChange = (event) => {
        const input = event.target.value;
        setInput(input);
        if (input) {
            const inputType = determineType(input);
            if (inputType !== "UNKNOWN") {
                fetchResult(input, inputType, handleResult);
            }
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="🔎  Type a ZIP code or set of coordinates"
                value={input}
                onChange={handleChange}
            />
        </div>
    );
};
