import React from "react";
import "../css/header.css";


export default function Header() {
    return (
        <div className="header">
            <div className="title">
                <a href="https://zipcoords.co">
                    ZIPCoords
                </a>
            </div>
            <div className="links">
                <a
                    href="https://github.com/mikezangus/ZIPCoords"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    About
                </a>
                <a
                    href="https://google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Submit feedback
                </a>
            </div>
        </div>
    );
};