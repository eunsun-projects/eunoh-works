/* eslint-disable react/no-children-prop */
"use client";
import styles from "@/app/(public)/texts/[slug]/_components/text.module.css";
import { gothicA1 } from "@/app/fonts";
import useTextIndex from "@/hooks/useTextindex";
import { TextType } from "@/types/texts.type";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function TextContents({ post, pageArr }: { post: TextType; pageArr: number[][] }) {
    const { setAction: action } = useTextIndex();
    // const mobile = useIfMobile();
    // const innerH = useSetInnerH(mobile);

    useEffect(() => {
        pageArr.forEach((e, i) => {
            if (e.includes((post.value as number) - 1)) {
                action.setPage(i);
                const found = e.findIndex((a) => a === (post.value as number) - 1);
                action.setCurrNum(found);
            }
        });
    }, [post, action, pageArr]);

    return (
        <div className={`${gothicA1.className} ${styles.txtcontainer}`}>
            <h2 className={styles.txttitle}>{post.title}</h2>
            <br />
            <p className={styles.subtitle}>{post.author}</p>
            <br />
            <div className={styles.pcontainer}>
                <ReactMarkdown className={styles.text} children={post.content as string} remarkPlugins={[remarkGfm]} />
            </div>
        </div>
    );
}
