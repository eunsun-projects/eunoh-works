import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { emailRegex } from "../common/commonRegexs";

const signIn = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    if (!email || !password) return alert("빈 값이 없도록 해주세요");

    if (/\s/.test(email) || /\s/.test(password)) return alert("공백을 포함할 수 없습니다!");

    if (!emailRegex.test(email)) return alert("유효한 이메일 주소를 입력하세요!");
    if (password.length < 4 || password.length > 15) return alert("비밀번호는 4~15 글자로 해야합니다!");

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return redirect("/login");
    }

    return redirect("/admin");
};

export default signIn;
