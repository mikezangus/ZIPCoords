import React, { useState } from "react";
import "./css/index.css"
import SearchBar from "./components/search/SearchBar";



export default function App() {

    const handleSearch = (searchTerm) => {
        console.log(searchTerm)
    };

    return (
        <body>
            <main>

                <SearchBar
                    onSearch={handleSearch}
                />

            </main>
        </body>

    )
} 