import Input from "@/components/common/Input";
import signIn from "@/utils/auth/signIn";
import BackButton from "../buttons/BackButton";
import MoveToSignUpButton from "../buttons/MoveToSignUpButton";
import { SubmitButton } from "../buttons/submit-button";

function LoginForm() {
    return (
        <dialog className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-foreground/20 flex flex-col w-full h-[400px] px-8 rounded-xl sm:max-w-md justify-center gap-2 bg-white m-[0px]">
            <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <BackButton />

                <div className="flex flex-col pb-4">
                    <Input label="아이디" required id="email" />
                    <Input label="비밀번호" required id="password" type="password" />
                </div>

                <SubmitButton
                    formAction={signIn}
                    className="bg-sky-600 text-white rounded-md px-4 py-2 text-foreground mb-2"
                    pendingText="Signing In..."
                >
                    Sign In
                </SubmitButton>

                <MoveToSignUpButton />
            </form>
        </dialog>
    );
}

export default LoginForm;
