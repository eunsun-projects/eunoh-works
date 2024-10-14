import LoginForm from "@/components/auth/form/LoginForm";
import ModalBack from "@/components/common/ModalBack";

function InterceptingLoginPage() {
    return (
        <ModalBack>
            <LoginForm />
        </ModalBack>
    );
}

export default InterceptingLoginPage;
