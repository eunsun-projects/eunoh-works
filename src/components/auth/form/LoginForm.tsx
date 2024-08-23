// import Input from "@/components/common/Input";
import signIn from "@/utils/auth/signIn";
import BackButton from "../buttons/BackButton";
import MoveToSignUpButton from "../buttons/MoveToSignUpButton";
import { SubmitButton } from "../buttons/submit-button";
import { FcGoogle } from "react-icons/fc";

function LoginForm() {
    return (
        <dialog className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-foreground/20 flex flex-col w-full h-[400px] px-4 py-2 rounded-xl sm:max-w-md justify-center gap-2 bg-white m-[0px]">
            <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <BackButton />

                {/* <div className="flex flex-col pb-4">
                    <Input label="아이디" required id="email" />
                    <Input label="비밀번호" required id="password" type="password" />
                </div> */}

                <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
                    <div className="w-full flex justify-center items-center">
                        구글로 로그인
                    </div>

                    <SubmitButton
                        formAction={signIn}
                        // className="bg-sky-600 text-white rounded-md px-4 py-2 text-foreground mb-2"
                        className="w-full flex justify-center items-center"
                        pendingText="Signing In..."
                    >
                        <FcGoogle className="w-14 h-14" />
                    </SubmitButton>
                </div>
                {/* <MoveToSignUpButton /> */}
            </form>
        </dialog>
    );
}

export default LoginForm;
