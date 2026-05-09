import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

const signOut = async () => {
    "use server";

    const supabase = await createClient();

    const { error } = await supabase.auth.signOut({
        scope: "global",
    });

    if (error) {
        return redirect("/login");
    }

    return redirect("/login");
};

export default signOut;
