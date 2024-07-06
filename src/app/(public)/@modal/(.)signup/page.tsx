import LogInSignUpModal from "@/components/auth/LogInSignUpModal";
import ModalBack from "@/components/common/ModalBack";

function InterceptingSignUpPage() {
    return (
        <ModalBack>
            <LogInSignUpModal type="signup" />
        </ModalBack>
    );
}

export default InterceptingSignUpPage;
