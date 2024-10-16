import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    if (code) {
        const cookieStore = cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) => {
                                cookieStore.set(name, value, options);
                            });
                        } catch {}
                    },
                },
            }
        );

        const { data, error } = await supabase.auth.exchangeCodeForSession(
            code
        );

        if (error) {
            return NextResponse.redirect(`${origin}/login`);
        }

        return NextResponse.redirect(`${origin}/admin`);
    }
    // URL to redirect to after sign up process completes
    return NextResponse.redirect(`${origin}/admin`);
}
