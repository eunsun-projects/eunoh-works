import { rubicBubbles } from "@/app/layout";
import styles from "@/css/main.module.css";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import LogOutButton from "../auth/buttons/LogOutButton";

const items = [
    {
        label: "Works",
        value: 1,
        href: "/works",
    },
    {
        label: "Texts",
        value: 2,
        href: "/texts",
    },
    {
        label: "About",
        value: 3,
        href: "/about",
    },
];

export default async function Header({ slug }: { slug: string | undefined }) {
    // const cookieStore = cookies();
    // const allCookies = cookieStore.getAll();

    // const authTokenCookies = allCookies.filter((cookie) => cookie.name.startsWith("sb-ageijospngqmyzptvsoo-auth-token"));

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <header className={styles.header} style={{ display: slug === "sonnyinfo" ? "none" : "block" }}>
            <div className={styles.eunheadernav}>
                <ul className={styles.topmenu}>
                    <li className={`${styles.eunoh} ${rubicBubbles.className}`}>
                        <Link href={"/"} prefetch={false}>
                            EunOh
                        </Link>
                    </li>

                    {items.map((e, i) => (
                        <li key={i}>
                            <button className="h-full font-semibold text-black text-center text-[2.5vh] flex justify-center items-center defmenu active:bg-white active:border-t active:border-l active:border-r active:border-[#6e6e6e] active:border-b active:rounded-tl-[10%] active:rounded-tr-[10%] active:rounded-bl-none active:rounded-br-none">
                                <Link href={e.href} prefetch={false}>
                                    {e.label}
                                </Link>
                            </button>
                        </li>
                    ))}

                    {user && slug === "admin" ? (
                        <div className="ml-auto flex gap-x-2">
                            {"🎉"}
                            <LogOutButton />
                        </div>
                    ) : (
                        <li className={styles.instamenu}>
                            <Link href={"https://instagram.com/eunohhh"} target="_blank" prefetch={false}>
                                뷁
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
}
