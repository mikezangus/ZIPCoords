import React from "react";
import styles from "../css/Header.module.css";


export default function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.title}>
                <a href="https://zangus.co">
                    ZIPCoords
                </a>
            </div>
            <div className={styles.links}>
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