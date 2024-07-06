import LogInModal from "@/components/auth/LogInModal";
// import MainPage from "../_components/MainPage";

export default function LoginPage({ searchParams }: { searchParams: { message: string } }) {
    return (
        <>
            <LogInModal searchParams={searchParams} />
            {/* <MainPage /> */}
        </>
    );
}
