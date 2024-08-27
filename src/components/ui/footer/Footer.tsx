"use client";

import styles from "@/app/(public)/_components/main.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SvgComponentCc, SvgComponentLeft, SvgComponentMan } from "./FooterSvgs";

export default function Footer({ slug }: { slug: string | undefined }) {
    const pathname = usePathname();

    return (
        <footer
            className={styles.footer}
            style={{
                display:
                    slug === "sonnyinfo" ||
                    slug === "sonny" ||
                    pathname === "/works/sonnyinfo" ||
                    pathname === "/works/sonny"
                        ? "none"
                        : "flex",
            }}
        >
            <p>
                <SvgComponentCc />
                <SvgComponentMan />
                <Link href="/login" scroll={false}>
                    <SvgComponentLeft />
                </Link>
                &nbsp;2024. Eun Oh.
            </p>
        </footer>
    );
}
