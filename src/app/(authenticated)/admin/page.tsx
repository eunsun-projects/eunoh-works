import AuthButton from "@/components/auth/buttons/AuthButton";

function AdminPage() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold">관리자 페이지</h2>
            <AuthButton />
        </div>
    );
}

export default AdminPage;
