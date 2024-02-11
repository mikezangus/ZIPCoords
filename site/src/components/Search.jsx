import React, { useState } from "react";
import fetchResult from "./fetchResult";
import "../css/search.css"


export default function Search({ handleResult }) {

    const [input, setInput] = useState("");

    const handleChange = (event) => {
        const input = event.target.value;
        setInput(input);
        console.log("input", input)
        if (input) {
            const inputType = determineInputType(input);
            console.log("input type", inputType, "input", input)
            if (inputType !== "UNKNOWN") {
                fetchResult(input, inputType, handleResult);
            }
        }
    };

    const determineInputType = (input) => {
        const zipRegex = /^\d{5}(-\d{4})?$/;
        const coordRegex = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
        if (zipRegex.test(input)) {
            return "ZIP"
        } else if (coordRegex.test(input)) {
            return "COORDS"
        } else {
            return "UNKNOWN"
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
