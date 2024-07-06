import signIn from "@/utils/auth/signIn";
import BackButton from "../common/BackButton";
import MoveToSignUpButton from "./MoveToSignUpButton";
import { SubmitButton } from "./submit-button";

function LoginForm() {
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
                formAction={signIn}
                className="bg-sky-600 text-white rounded-md px-4 py-2 text-foreground mb-2"
                pendingText="Signing In..."
            >
                Sign In
            </SubmitButton>

            <MoveToSignUpButton />
        </form>
    );
}

export default LoginForm;
