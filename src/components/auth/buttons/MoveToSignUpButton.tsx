"use client";

import { useRouter } from "next/navigation";

function MoveToSignUpButton() {
    const router = useRouter();

    const moveToSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        router.push("/signup", { scroll: false });
    };

    return (
        <button
            onClick={moveToSignUp}
            type="button"
            className="bg-sky-600 text-white rounded-md px-4 py-2 text-foreground mb-2"
        >
            Go to Sign Up
        </button>
    );
}

export default MoveToSignUpButton;
