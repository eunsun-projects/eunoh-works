"use client";

import Script from "next/script";
import styles from "./main.module.css";

function MainPage() {
    return (
        <>
            <Script
                type="module"
                src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
                crossOrigin="anonymous"
                strategy="lazyOnload"
            ></Script>

            <div className={styles.container} style={{ height: "100%" }}>
                <div className={styles.mainitems}>
                    <model-viewer
                        class={styles.mainitem_1}
                        src={"/assets/balzac.glb"}
                        poster="/assets/17-20.webp"
                        camera-controls
                        auto-rotate
                        shadow-intensity="1"
                    ></model-viewer>
                    <model-viewer
                        class={styles.mainitem_2}
                        src={"/assets/misun.glb"}
                        poster="/assets/17-19.webp"
                        camera-controls
                        auto-rotate
                        shadow-intensity="1"
                    ></model-viewer>
                </div>
            </div>
        </>
    );
}

export default MainPage;
