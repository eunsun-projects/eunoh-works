"use client";

import dynamic from "next/dynamic";

const Timer = dynamic(() => import("./Timer"), {
    ssr: false,
});

export default function TimerClient() {
    return <Timer />;
}
