"use client";
import { useRouter } from "next/navigation";

function BackButton() {
    const router = useRouter();

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        router.push("/no-route");
    };

    return (
        <button
            onClick={handleBack}
            type="button"
            className="relative py-0 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center justify-end group text-sm"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            >
                <polyline points="15 18 9 12 15 6" />
            </svg>{" "}
            Back
        </button>
    );
}

export default BackButton;
