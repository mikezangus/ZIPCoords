import React, { useState } from "react";
import "../../css/searchbar.css"


export default function SearchBar({ onSearch }) {

    const [input, setInput] = useState("");

    const handleChange = (event) => {
        const value = event.target.value
        setInput(value);
        const inputType = determineInputType(value);
        console.log(inputType)
        if (onSearch) {
            onSearch(value, inputType)
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
                placeholder="🔎 Type a ZIP code or set of coordinates"
                value={input}
                onChange={handleChange}
            />
        </div>
    )

}