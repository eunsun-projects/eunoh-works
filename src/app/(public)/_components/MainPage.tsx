import Link from "next/link";

function MainPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="h-[500px] bg-red-500">테스트입니다</div>
            <Link href="/login">로그인</Link>
        </main>
    );
}

export default MainPage;
