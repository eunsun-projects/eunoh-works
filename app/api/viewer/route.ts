import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase
      .from("viewer")
      .select("*")
      .order("number", { ascending: true });

  if (error) {
      revalidatePath("/", "layout");
      return NextResponse.json(error.message, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}