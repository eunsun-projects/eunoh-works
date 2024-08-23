import { TextIndexProvider } from "@/context/textIndexContext";
import { TextType } from "@/types/texts.type";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "src/md"); //루트를 기준으로 markdown 파일들이 있는 폴더 위치 알리기

function getPostSlugs() {
    return fs.readdirSync(postsDirectory);
}

function getPostBySlug(slug: string, fields: string[]) {
    const realSlug = slug.replace(/\.md$/, ""); //파일명
    const fullPath = join(postsDirectory, `${realSlug}.md`); //해당 파일의 위치 찾기
    const fileContents = fs.readFileSync(fullPath, "utf8"); //파일 가져오기
    const { data, content } = matter(fileContents); //마크다운 to 자바스크립트

    const items: TextType = {}; //파일 데이터

    //---에서 설정한 변수 중 인자로 들어온 값만 데이터에 추가
    fields.forEach((field) => {
        if (field === "page") {
            items[field] = realSlug;
        }
        if (field === "content") {
            items[field] = content;
        }
        if (typeof data[field] !== "undefined") {
            items[field] = data[field];
        }
    });

    return items;
}

export function getData() {
    const slugs = getPostSlugs(); // 로컬의 모든 md 파일 파일명을 기준으로 배열 생성
    const posts = slugs.map((e) =>
        getPostBySlug(e, ["value", "page", "title", "href", "author", "date", "content"])
    ); // 모든 포스트 자바스크립트 객체화하여 배열로 리턴

    posts.sort(
        (first, second) =>
            new Date(second.date as string).getTime() - new Date(first.date as string).getTime()
    );

    return posts;
}

export default function TextsLayout({ children }: { children: React.ReactNode }) {
    return <TextIndexProvider>{children}</TextIndexProvider>;
}
