import { BlurImageProvider } from "@/context/blurImageContext";
import { worksData } from "@/data/worksData";
import type { BlurredImagesByYear } from "@/types/data.type";
import getBlurredImageAsBase64 from "@/utils/works/getBlurredImgAsBase64";
import WorksNav from "./_components/WorksNav";

async function getData(): Promise<BlurredImagesByYear> {
	try {
		const years = Object.keys(worksData);
		const yearsUnder2023 = years.filter((year) => Number(year) < 2023);

		const promises = yearsUnder2023.map(async (year) => {
			const images = worksData[year].map((e) => e.src);
			return Promise.all(images.map((image) => getBlurredImageAsBase64(image)));
		});

		const images = await Promise.all(promises);

		const result = images.reduce<BlurredImagesByYear>((acc, curr, index) => {
			acc[yearsUnder2023[index]] = curr;
			return acc;
		}, {});

		return result;
	} catch (error) {
		console.error("getData 에러:", error);
		return {}; // 빈 객체 반환으로 fallback
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
