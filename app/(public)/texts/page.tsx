import { Suspense } from "react";
import { basicMeta } from "@/app/basicMeta";
import Loading from "@/app/loading";
import type { TextType } from "@/types/texts.type";
import TextOuter from "./_components/TextOuter";
import { getData } from "./_lib/getData";

export const metadata = basicMeta;

export const dynamic = "force-static";

export default function TextsMainPage() {
	const posts: TextType[] = getData();

	return (
		<Suspense fallback={<Loading />}>
			<TextOuter posts={posts} />
		</Suspense>
	);
}
