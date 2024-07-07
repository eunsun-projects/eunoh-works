"use client";

import { useRouter } from "next/navigation";

function ModalBack({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const handleBack = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        router.push("/no-route");
    };
    return (
        <>
            <div
                onClick={handleBack}
                className="fixed z-10 w-dvw h-dvh flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-black/[0.4]"
            ></div>
            {children}
        </>
    );
}

export default ModalBack;
