import signUp from "@/utils/auth/signUp";
import BackButton from "../common/BackButton";
import { SubmitButton } from "./submit-button";

function SignUpForm() {
    return (
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
                formAction={signUp}
                className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
                pendingText="Signing Up..."
            >
                Sign Up
            </SubmitButton>
        </form>
    );
}

export default SignUpForm;
