import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const signIn = async (formData: FormData) => {
    "use server";
    const supabase = createClient();

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not set");
    }

    // const email = formData.get("email") as string;
    // const password = formData.get("password") as string;

    // if (!email || !password) return alert("빈 값이 없도록 해주세요");

    // if (/\s/.test(email) || /\s/.test(password)) return alert("공백을 포함할 수 없습니다!");

    // if (!emailRegex.test(email)) return alert("유효한 이메일 주소를 입력하세요!");
    // if (password.length < 4 || password.length > 15) return alert("비밀번호는 4~15 글자로 해야합니다!");

    // const { error } = await supabase.auth.signInWithPassword({
    //     email,
    //     password,
    // });

    const getUrl = () => {
        let url =
            process.env.NEXT_PUBLIC_BASE_URL ??
            process.env.NEXT_PUBLIC_VERCEL_URL ??
            "http://localhost:3000";

        url = url.startsWith("http") ? url : `https://${url}`;
        url = url.endsWith("/") ? url : `${url}/`;
        return url;
    };

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${getUrl()}api/auth/callback`,
        },
    });

    if (error) {
        return redirect("/login");
    }

    return redirect(data.url);
};

export default signIn;
