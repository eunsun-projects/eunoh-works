"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CatchAll() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/no-route") {
            router.push("/");
        }
    }, [router, pathname]);

    return null;
}
