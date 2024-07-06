import SignUpForm from "@/components/auth/form/SignUpForm";
import ModalBack from "@/components/common/ModalBack";

function InterceptingSignUpPage() {
    return (
        <ModalBack>
            <SignUpForm />
        </ModalBack>
    );
}

export default InterceptingSignUpPage;
