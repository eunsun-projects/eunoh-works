"use client";

import styles from "@/app/(public)/works/_components/works.module.css";
import { years_data } from "@/data/yearsData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function WorksNav() {
    const [yearSelec, setYearSelec] = useState(-1);
    const pathname = usePathname();

    const handleYearmenuClick = (i: number) => () => setYearSelec(i);

    return (
        <nav
            className={styles.worksnav}
            style={{
                borderBottom: "1px solid #6e6e6e",
                visibility:
                    pathname === "/works/sonnny" || pathname === "/works/sonnyinfo" ? "hidden" : "visible",
            }}
        >
            <ul className={styles.ultabmenu}>
                {years_data.map((e, i) => (
                    <Link href={e.href} key={i} onClick={handleYearmenuClick(i)} prefetch={false}>
                        <li className={`${styles.tabmenu} ${yearSelec === i ? styles.active : ""}`}>
                            {e.year}
                        </li>
                    </Link>
                ))}
            </ul>
        </nav>
    );
}
