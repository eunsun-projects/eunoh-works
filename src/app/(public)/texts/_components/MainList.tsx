"use client";

import styles from "@/app/(public)/texts/_components/texts.module.css";
import { gothicA1 } from "@/app/fonts";
import useTextIndex from "@/hooks/useTextindex";
import { TextType } from "@/types/texts.type";
import Link from "next/link";

export default function MainLists({ posts }: { posts: TextType[] }) {
    const { index: value, curr, setAction: action } = useTextIndex();

    const handleClick = (index: number) => () => {
        action.setPage(index);
    };

    return (
        <div
            className={`${styles.txtlistbox} ${gothicA1.className}`}
            style={{ display: "flex", alignItems: "center", overflowY: "auto" }}
        >
            <div className={styles.txtlistnav}>
                <ul className={styles.ultxtlist}>
                    {posts.map((e, i) => (
                        <li key={i} className={`${styles.txtlist} ${value === i ? styles.titleactive : ""}`}>
                            <Link href={e.href as string} onClick={handleClick(i)} prefetch={false}>
                                {e.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
