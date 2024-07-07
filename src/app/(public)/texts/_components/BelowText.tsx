"use client";
import styles from "@/app/(public)/texts/_components/texts.module.css";
import useTextIndex from "@/hooks/useTextindex";
import { TextProps } from "@/types/texts.type";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Pagination from "./Pagination";

export default function Below({ posts }: TextProps) {
    const pathname = usePathname();
    const { index: value, curr, setAction: action } = useTextIndex();
    const router = useRouter();

    const handleClick = () => {
        action.setCurrNum(null);
        action.setPage(0);
        router.push("/texts");
    };

    useEffect(() => {
        if (pathname === "/texts") {
            action.setCurrNum(null);
            action.setPage(0);
        }
    }, [pathname, action]);

    return (
        <div id="numbering" className={styles.numbox}>
            <div className={styles.numbering}>
                <Pagination totalPage={posts} limit={5} page={value} curr={curr} />
            </div>
            <p className={styles.back}>
                <Link href="/texts" onClick={handleClick} prefetch={false}>
                    &gt;back to list&lt;
                </Link>
            </p>
        </div>
    );
}
