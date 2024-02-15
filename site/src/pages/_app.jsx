import React from "react";
import "../css/index.css";
import Header from "../components/Header";


export default function App({ Component, pageProps }) {

    return (
        <>
            <Header />
            <main>
                <Component {...pageProps} />
            </main>
        </>
    );

};
