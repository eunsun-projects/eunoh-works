import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function LogInSignUpModal({ type }: { type: "login" | "signup" }) {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-foreground/20 flex flex-col w-full h-[400px] px-8 rounded-xl sm:max-w-md justify-center gap-2 bg-white">
            {type === "login" ? <LoginForm /> : <SignUpForm />}
        </div>
    );
}

export default LogInSignUpModal;
