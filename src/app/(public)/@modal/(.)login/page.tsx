import LogInModal from "@/components/auth/LogInModal";

function InterceptingLoginPage({ searchParams }: { searchParams: { message: string } }) {
    return (
        <>
            <LogInModal searchParams={searchParams} />
        </>
    );
}

export default InterceptingLoginPage;
