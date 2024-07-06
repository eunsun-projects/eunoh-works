import LogInModal from "@/components/auth/LogInModal";

function InterceptingLoginPage({ searchParams }: { searchParams: { message: string } }) {
    return (
        <section className="w-screen h-full absolute flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-black/[0.4]">
            <LogInModal searchParams={searchParams} />
        </section>
    );
}

export default InterceptingLoginPage;
