import React from "react";
import styles from "../styles/Header.module.css";


export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerItemsContainer}>
                <div className={styles.titleContainer}>
                    <a href="https://zangus.co">
                        ZIPCoords
                    </a>
                </div>
                <div className={styles.pagesContainer}>
                    <a
                        href="https://github.com/mikezangus/ZIPCoords"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        About
                    </a>
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfxtDZWA8z0EUFYxW5_e_iNphSVznVZtUouaguU3ec3DegL-A/viewform?usp=sf_link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Submit feedback
                    </a>
                </div>
            </div>
        </div>
    );
};
