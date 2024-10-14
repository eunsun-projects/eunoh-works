"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
    Md360,
    MdBlurOn,
    MdClear,
    MdContrast,
    MdGraphicEq,
    MdGridOn,
    MdGridView,
    MdLightbulbOutline,
    MdOutlineHighlight,
    MdOutlineWbIridescent,
    MdOutlineWbSunny,
    MdTripOrigin,
} from "react-icons/md";
import SonnyClass from "../_class/sonny.class";
import styles from "../sonny.module.css";

const delay = 300; // 더블 탭으로 판단하기 위한 시간 간격(밀리초)

function SonnyMain() {
    const appRef = useRef<SonnyClass | null>(null);
    const rafRef = useRef<number | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const guiMainRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const loadDivRef = useRef<HTMLDivElement>(null);
    const lastTapTime = useRef<number>(0);
    const idleTime = useRef<number>(0);

    const onOff = (target: HTMLElement) => {
        const rightIcon = document.querySelectorAll(".xyzright");
        rightIcon.forEach((el) => {
            el.classList.remove(styles.xyzon);
        });
        target.classList.add(styles.xyzon);
    };

    const toggle = (target: HTMLElement) => {
        const rightIcon = document.querySelectorAll(".xyzright");
        if (target.classList.value.includes(styles.xyzon)) {
            rightIcon.forEach((el) => {
                el.classList.remove(styles.xyzon);
            });
            appRef.current?.removeLight();
        } else {
            onOff(target);
            if (target.dataset.ui) appRef.current?.lightModeChange(target.dataset.ui);
        }
    };

    const handleLightClick = (e: React.MouseEvent<SVGElement>) => {
        if (appRef.current) {
            if (e.currentTarget instanceof SVGElement) {
                const target = e.currentTarget as unknown as HTMLElement;
                switch (target.dataset.ui) {
                    case "360":
                        appRef.current.toggleRotation(target);
                        break;
                    case "wb_sunny":
                        console.log(target);
                        toggle(target);
                        break;
                    case "wb_iridescent":
                        toggle(target);
                        break;
                    case "lightbulb":
                        toggle(target);
                        break;
                    case "highlight":
                        toggle(target);
                        break;
                    case "grid_on":
                        appRef.current?.toggleWireframe(target);
                        break;
                    case "contrast":
                        appRef.current?.toggleMap(target);
                        break;
                    case "trip_origin":
                        appRef.current?.toggleReflection(target);
                        break;
                    case "grid_view":
                        appRef.current?.togglePixelate(target);
                        break;
                    case "graphic_eq":
                        appRef.current?.toggleGlitch(target);
                        break;
                    case "blur_on":
                        appRef.current?.toggleDotScreen(target);
                        break;
                }
            }
        } else {
            console.log("not ready!");
            return;
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (appRef.current !== undefined && appRef.current !== null) {
            if (appRef.current.nowLoading === 0 || e.detail === 2) {
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
            if (appRef.current?.nowLoading === 0) {
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
        if (canvasRef.current && overlayRef.current && loadDivRef.current) {
            appRef.current = new SonnyClass(canvasRef.current, overlayRef.current, loadDivRef.current);

            window.onresize = appRef.current.resize.bind(appRef.current);
            appRef.current.resize();

            const animate = () => {
                appRef.current?.render(); // 실제 렌더링 함수
                rafRef.current = requestAnimationFrame(animate);
            };
            animate();
        }
        document.body.addEventListener("click", idleTimeReset);

        intervalRef.current = setInterval(() => {
            idleTime.current = idleTime.current + 1;
            if (idleTime.current >= 3) {
                // 3 minutes
                console.log("reload!");
                // router.push("/sonny");
            }
        }, 60000);

        document.documentElement.style.overscrollBehavior = "none";

        return () => {
            document.documentElement.style.overscrollBehavior = "auto";
            document.body.removeEventListener("click", idleTimeReset);
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            window.onresize = null;
            appRef.current?.destroy();
        };
    }, []);

    return (
        <div className={styles.guiMain3d} ref={guiMainRef}>
            <div className={styles.temporal} ref={overlayRef}></div>
            <div className={styles.xyzNoneLandscape}>
                <h3>Looks good in portrait mode!</h3>
            </div>
            <div className={styles.guiWrapper3d} onClick={handleMouseDown} onTouchEnd={handleTouchEnd}>
                <div className={styles.top3d}>
                    <Link href="/works/sonnyinfo">
                        <span className={styles.sonnyinfoA}>info</span>
                    </Link>
                    <Link href="/works/2023">
                        <MdClear className="xyzright w-6 h-6 cursor-pointer select-all pointer-events-auto" />
                    </Link>
                </div>

                <div className={styles.mid3d}>
                    <div className={styles.midLeft3d}></div>
                    <div className={styles.midRight3d}></div>
                    <div className={styles.xyzLoading} ref={loadDivRef}></div>
                </div>

                <div className={styles.btm3d}>
                    <div className={styles.btmLeft3d}></div>
                    <div className={styles.btmRight3d}>
                        <Md360
                            className="xyzright w-6 h-6 cursor-pointer"
                            data-ui="360"
                            onClick={handleLightClick}
                        />
                        <MdOutlineWbSunny
                            className="xyzright w-6 h-6 cursor-pointer"
                            data-ui="wb_sunny"
                            onClick={handleLightClick}
                        />
                        <MdOutlineWbIridescent
                            className="xyzright w-6 h-6 cursor-pointer"
                            data-ui="wb_iridescent"
                            onClick={handleLightClick}
                        />
                        <MdLightbulbOutline
                            className="xyzright w-6 h-6 cursor-pointer"
                            data-ui="lightbulb"
                            onClick={handleLightClick}
                        />
                        <MdOutlineHighlight
                            className="xyzright w-6 h-6 cursor-pointer"
                            data-ui="highlight"
                            onClick={handleLightClick}
                        />
                        <MdGridOn
                            className="xyzview w-6 h-6 cursor-pointer"
                            data-ui="grid_on"
                            onClick={handleLightClick}
                        />
                        <MdContrast
                            className="xyzview w-6 h-6 cursor-pointer"
                            data-ui="contrast"
                            onClick={handleLightClick}
                        />
                        <MdTripOrigin
                            className="xyzview w-6 h-6 cursor-pointer"
                            data-ui="trip_origin"
                            onClick={handleLightClick}
                        />
                        <MdGridView
                            className="xyzeffects w-6 h-6 cursor-pointer"
                            data-ui="grid_view"
                            onClick={handleLightClick}
                        />
                        <MdGraphicEq
                            className="xyzeffects w-6 h-6 cursor-pointer"
                            data-ui="graphic_eq"
                            onClick={handleLightClick}
                        />
                        <MdBlurOn
                            className="xyzeffects w-6 h-6 cursor-pointer"
                            data-ui="blur_on"
                            onClick={handleLightClick}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.xyzCanvas} ref={canvasRef}></div>
        </div>
    );
}

export default SonnyMain;
