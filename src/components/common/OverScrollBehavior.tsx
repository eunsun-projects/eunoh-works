"use client";

import { useEffect } from "react";

function OverScrollBehavior() {
    useEffect(() => {
        document.documentElement.style.overscrollBehavior = "none";

        return () => {
            document.documentElement.style.overscrollBehavior = "auto";
        };
    }, []);

    return <></>;
}

export default OverScrollBehavior;
