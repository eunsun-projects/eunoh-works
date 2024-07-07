import styles from "@/css/main.module.css";
import Link from "next/link";
import { SvgComponentCc, SvgComponentLeft, SvgComponentMan } from "./FooterSvgs";

export default function Footer({ slug }: { slug: string | undefined }) {
    // const pathname = usePathname();

    return (
        <footer>
            <div className={styles.footer} style={{ display: slug === "sonnyinfo" ? "none" : "flex" }}>
                <p>
                    <SvgComponentCc />
                    <SvgComponentMan />
                    <Link href="/login" scroll={false}>
                        <SvgComponentLeft />
                    </Link>
                    &nbsp;2024. Eun Oh.
                </p>
            </div>
        </footer>
    );
}
