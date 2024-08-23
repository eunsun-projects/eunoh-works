"use client";

import { rubic } from "@/app/fonts";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

function HeaderMenuList() {
    const pathname = usePathname();

    return (
        <>
            {items.map((e, i) => (
                <li
                    key={i}
                    className={clsx(
                        "h-full flex justify-center items-center border-b-0 border-b-white box-content",
                        {
                            "bg-white border-t border-l border-r border-[#6e6e6e] rounded-t-lg":
                                pathname === e.href,
                        }
                    )}
                >
                    <button
                        className={`h-full font-semibold text-black text-center text-[2.5vh] flex justify-center items-center ${rubic.className}`}
                    >
                        <Link href={e.href} prefetch={false}>
                            {e.label}
                        </Link>
                    </button>
                </li>
            ))}
        </>
    );
}

export default HeaderMenuList;
