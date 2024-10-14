import { basicMeta } from "@/app/basicMeta";
import Loading from "@/app/loading";
import { TextType } from "@/types/texts.type";
import { Suspense } from "react";
import TextOuter from "./_components/TextOuter";
import { getData } from "./_lib/getData";

export const metadata = basicMeta;

export default function TextsMainPage() {
    const posts: TextType[] = getData();

    return (
        <Suspense fallback={<Loading />}>
            <TextOuter posts={posts} />
        </Suspense>
    );
}
