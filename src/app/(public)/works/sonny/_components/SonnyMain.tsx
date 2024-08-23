"use client";

import Link from "next/link";
import styles from "../sonny.module.css";
import { useEffect, useRef, useState } from "react";
import SonnyClass from "../_class/sonny.class";
import { useRouter } from "next/navigation";

const delay = 300; // 더블 탭으로 판단하기 위한 시간 간격(밀리초)

function SonnyMain() {
    const [app, setApp] = useState<SonnyClass | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const guiMainRef = useRef<HTMLDivElement>(null);
    const canvasREf = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const loadDivRef = useRef<HTMLDivElement>(null);
    const lastTapTime = useRef<number>(0);
    const idleTime = useRef<number>(0);
    const router = useRouter();

    const onOff = (target: HTMLElement) => {
        const rightIcon = document.querySelectorAll(".xyzright");
        rightIcon.forEach((el) => {
            el.classList.remove("xyzon");
        });
        target.classList.add("xyzon");
    };

    const toggle = (target: HTMLElement) => {
        const rightIcon = document.querySelectorAll(".xyzright");
        if (target.classList.value.includes("xyzon")) {
            rightIcon.forEach((el) => {
                el.classList.remove("xyzon");
            });
            app?.removeLight();
        } else {
            onOff(target);
            app?.lightModeChange(target.innerHTML);
        }
    };

    const handleLightClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (app !== undefined && app !== null) {
            switch (e.currentTarget.innerText) {
                case "360":
                    app?.toggleRotation(e.currentTarget);
                    break;
                case "wb_sunny":
                    toggle(e.currentTarget);
                    break;
                case "wb_iridescent":
                    toggle(e.currentTarget);
                    break;
                case "lightbulb":
                    toggle(e.currentTarget);
                    break;
                case "highlight":
                    toggle(e.currentTarget);
                    break;
                case "grid_on":
                    app?.toggleWireframe(e.currentTarget);
                    break;
                case "contrast":
                    app?.toggleMap(e.currentTarget);
                    break;
                case "trip_origin":
                    app?.toggleReflection(e.currentTarget);
                    break;
                case "grid_view":
                    app?.togglePixelate(e.currentTarget);
                    break;
                case "graphic_eq":
                    app?.toggleGlitch(e.currentTarget);
                    break;
                case "blur_on":
                    app?.toggleDotScreen(e.currentTarget);
                    break;
            }
        } else {
            console.log("not ready!");
            return;
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (app) {
            if (app.nowLoading === 0 || e.detail === 2) {
                alert("좀 천천히하셈");
            }
        }
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        let currentTime = new Date().getTime();
        let timeDifference = currentTime - lastTapTime.current;

        if (timeDifference < delay && timeDifference > 0) {
            alert("좀 천천히하셈");
        } else {
            if (app?.nowLoading === 0) {
                alert("좀 천천히하셈");
            }
        }
        lastTapTime.current = currentTime; // 마지막 탭 시간을 현재 시간으로 업데이트
    };

    const idleTimeReset = () => {
        idleTime.current = 0;
        console.log("idleTime reset");
    };

    useEffect(() => {
        if (!app) {
            const app = new SonnyClass(
                guiMainRef,
                canvasREf,
                overlayRef,
                loadDivRef
            );
            setApp(app);
        }
        document.body.addEventListener("click", idleTimeReset);

        intervalRef.current = setInterval(() => {
            idleTime.current = idleTime.current + 1;
            if (idleTime.current >= 3) {
                // 3 minutes
                console.log("reload!");
                router.push("/sonny");
            }
        }, 60000);

        return () => {
            document.body.removeEventListener("click", idleTimeReset);
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
            app?.destroy();
        };
    }, [router, app]);

    return (
        <div className={styles.guiMain3d} ref={guiMainRef}>
            <div className={styles.temporal} ref={overlayRef}></div>
            <div className={styles.xyzNoneLandscape}>
                <h3>Looks good in portrait mode!</h3>
            </div>
            <div className={styles.guiWrapper3d} onClick={handleMouseDown}>
                <div className={styles.top3d}>
                    <Link href="/sonnyinfo">
                        <span className={styles.sonnyinfoA}>info</span>
                    </Link>
                    <Link href="/works/2023">
                        <span className={styles.materialSymbolsOutlined}>
                            clear
                        </span>
                    </Link>
                </div>

                <div className={styles.mid3d}>
                    <div className={styles.midLeft3d}></div>
                    <div className={styles.midRight3d}></div>
                    <div className={styles.xyzLoading} ref={loadDivRef}></div>
                </div>

                <div className={styles.btm3d}>
                    <div className={styles.btmLeft3d}></div>
                    <div
                        className={styles.btmRight3d}
                        onClick={handleLightClick}
                    >
                        <span className={`${styles.materialSymbolsOutlined}`}>
                            360
                        </span>
                        <span
                            className={`${styles.materialSymbolsOutlined} xyzright`}
                        >
                            wb_sunny
                        </span>
                        <span
                            className={`${styles.materialSymbolsOutlined} xyzright`}
                        >
                            wb_iridescent
                        </span>
                        <span
                            className={`${styles.materialSymbolsOutlined} xyzright`}
                        >
                            lightbulb
                        </span>
                        <span
                            className={`${styles.materialSymbolsOutlined} xyzright`}
                        >
                            highlight
                        </span>
                        <span
                            className={`${styles.materialSymbolsOutlined} xyzview`}
                        >
                            grid_on
                        </span>
                        <span
                            className={`${styles.materialSymbolsOutlined} xyzview`}
                        >
                            contrast
                        </span>
                        <span
                            className={`${styles.materialSymbolsOutlined} xyzview`}
                        >
                            trip_origin
                        </span>
                        <span
                            className={`${styles.materialSymbolsOutlined} xyzeffects`}
                        >
                            grid_view
                        </span>
                        <span
                            className={`${styles.materialSymbolsOutlined} xyzeffects`}
                        >
                            graphic_eq
                        </span>
                        <span
                            className={`${styles.materialSymbolsOutlined} xyzeffects`}
                        >
                            blur_on
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.xyzCanvas} ref={canvasREf}></div>
        </div>
    );
}

export default SonnyMain;
