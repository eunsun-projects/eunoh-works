import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { validateWhiteSpace } from "../common/authValidations";
import { emailRegex } from "../common/commonRegexs";

const signUp = async (formData: FormData) => {
    "use server";
    const origin = headers().get("origin");
    const supabase = createClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordCheck = formData.get("password-check") as string;
    const nickname = formData.get("nickname") as string;

    if (!email || !password || !passwordCheck || !nickname) return alert("빈 값이 없도록 해주세요");

    if (password !== passwordCheck) return alert("비밀번호가 일치하지 않습니다");

    const hasWhiteSpace = validateWhiteSpace([email, password, passwordCheck, nickname]);

    if (hasWhiteSpace) return alert("공백을 포함할 수 없습니다!");

    if (!emailRegex.test(email)) alert("유효한 이메일 주소를 입력하세요!");
    if (password.length < 4 || password.length > 15) return alert("비밀번호는 4~15 글자로 해야합니다!");
    if (nickname.length < 1 || nickname.length > 10) return alert("닉네임은 1~10 글자로 해야합니다!");
    if (password !== passwordCheck) return alert("비밀번호가 일치하지 않습니다.");

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                emailRedirectTo: `${origin}/auth/callback`,
                user_name: nickname,
            },
        },
    });

    if (error) {
        return redirect("/signup");
    }

    return redirect("/admin");
};

export default signUp;
