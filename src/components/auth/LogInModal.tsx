import signIn from "@/utils/auth/signIn";
import Link from "next/link";
import BackButton from "../common/BackButton";
import { SubmitButton } from "./submit-button";

function LogInModal({ searchParams }: { searchParams: { message: string } }) {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-foreground/20 flex flex-col w-full h-[400px] px-8 rounded-xl sm:max-w-md justify-center gap-2 bg-white">
            <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <BackButton />

                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <SubmitButton
                    formAction={signIn}
                    className="bg-sky-600 text-white rounded-md px-4 py-2 text-foreground mb-2"
                    pendingText="Signing In..."
                >
                    Sign In
                </SubmitButton>

                <Link
                    href="/signup"
                    className="border text-white bg-amber-600 rounded-md px-4 py-2 text-foreground mb-2 text-center"
                >
                    Go to Sign Up
                </Link>

                {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">{searchParams.message}</p>
                )}
            </form>
        </div>
    );
}

export default LogInModal;

{
    /* <SubmitButton
    formAction={signUp}
    className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
    pendingText="Signing Up..."
>
    Sign Up
</SubmitButton>; */
}
