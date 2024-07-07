import styles from "@/app/(public)/texts/_components/texts.module.css";
import { TextProps } from "@/types/texts.type";
import Below from "./BelowText";
import MainLists from "./MainList";

export default function TextOuter({ posts }: TextProps) {
    return (
        <div className={`${styles.textconbox} h-full`}>
            <MainLists posts={posts} />
            <Below posts={posts} />
        </div>
    );
}
