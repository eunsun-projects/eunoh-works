import { rubicBubbles } from "@/app/layout";
import styles from "@/css/main.module.css";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import LogOutButton from "../../auth/buttons/LogOutButton";
import HeaderMenuList from "./HeaderMenuList";

export default async function Header({ slug }: { slug: string | undefined }) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <header className="pt-[0.3vh] relative" style={{ display: slug === "sonnyinfo" ? "none" : "block" }}>
            <div className="relative">
                <ul className={styles.topmenu}>
                    <li className={`${styles.eunoh} ${rubicBubbles.className}`}>
                        <Link href={"/"} prefetch={false}>
                            EunOh
                        </Link>
                    </li>

                    <HeaderMenuList />

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

// const cookieStore = cookies();
// const allCookies = cookieStore.getAll();

// const authTokenCookies = allCookies.filter((cookie) => cookie.name.startsWith("sb-ageijospngqmyzptvsoo-auth-token"));
