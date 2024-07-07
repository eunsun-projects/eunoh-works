import Link from "next/link";

function LoginLogoutSection() {
    return (
        <div className="ml-auto">
            <ul className="flex gap-x-2.5">
                <li>
                    <Link className="bg-blue-500 text-white rounded-md px-2 py-1 border border-blue-500" href="/login">
                        로그인
                    </Link>
                </li>
                <li>
                    <Link className="bg-green-500 text-white rounded-md px-2 py-1 border border-green-500" href="/signup">
                        회원가입
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default LoginLogoutSection;
