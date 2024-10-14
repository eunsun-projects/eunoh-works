"use client";

import styles from "@/app/(public)/about/_components/about.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import En from "./En";
import Ko from "./Ko";

export default function About() {
    const [currLang, setCurrLang] = useState("ko");

    const router = useRouter();
    const pathname = usePathname();
    const searchparams = useSearchParams();

    const lang = searchparams.get("lang");

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchparams);
            params.set(name, value);

            return params.toString();
        },
        [searchparams]
    );

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (e.currentTarget.dataset.lang === "ko") {
            setCurrLang("ko");
        } else if (e.currentTarget.dataset.lang === "en") {
            setCurrLang("en");
        }
    };

    useEffect(() => {
        router.push(pathname + "?" + createQueryString("lang", "ko"));
    }, [createQueryString, router, pathname]);

    useEffect(() => {
        if (currLang === "ko") {
            router.push(pathname + "?" + createQueryString("lang", "ko"));
        } else if (currLang === "en") {
            router.push(pathname + "?" + createQueryString("lang", "en"));
        }
    }, [currLang, createQueryString, router, pathname]);

    return (
        <div className="flex-1">
            <div className={styles.selector}>
                <h2>
                    <span data-lang="en" onClick={handleClick}>
                        EN
                    </span>
                    <span>/</span>
                    <span data-lang="ko" onClick={handleClick}>
                        KO
                    </span>
                </h2>
            </div>

            {lang === "ko" ? <Ko /> : <En />}
        </div>
    );
}
