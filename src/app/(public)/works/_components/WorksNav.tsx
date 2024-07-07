"use client";

import styles from "@/app/(public)/works/_components/works.module.css";
import { years_data } from "@/data/yearsData";
import Link from "next/link";
import { useState } from "react";

export default function WorksNav() {
    const [yearSelec, setYearSelec] = useState(-1);

    const handleYearmenuClick = (i: number) => () => {
        setYearSelec(i);
    };

    return (
        <nav className={styles.worksnav} style={{ borderBottom: "1px solid #6e6e6e" }}>
            <ul className={styles.ultabmenu}>
                {years_data.map((e, i) => (
                    <Link href={e.href} key={i} onClick={handleYearmenuClick(i)} prefetch={false}>
                        <li className={`${styles.tabmenu} ${yearSelec === i ? styles.active : ""}`}>{e.year}</li>
                    </Link>
                ))}
            </ul>
        </nav>
    );
}
