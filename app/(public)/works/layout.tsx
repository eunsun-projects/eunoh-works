import { BlurImageProvider } from "@/context/blurImageContext";
import { BlurredImagesByYear } from "@/types/data.type";
import WorksNav from "./_components/WorksNav";

async function getData() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/image`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default async function WorksLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const blurredImages: BlurredImagesByYear = await getData();

    return (
        <BlurImageProvider blurredImagesFromServer={blurredImages}>
            <section className="flex flex-col w-full">
                <WorksNav />
                {children}
            </section>
        </BlurImageProvider>
    );
}
