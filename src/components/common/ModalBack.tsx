"use client";

import { useRouter } from "next/navigation";

function ModalBack({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const handleBack = () => router.push("/no-route");
    return (
        <div
            onClick={handleBack}
            className="w-screen h-full absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-black/[0.4]"
        >
            {children}
        </div>
    );
}

export default ModalBack;
