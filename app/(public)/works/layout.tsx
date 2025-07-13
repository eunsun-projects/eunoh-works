import { BlurImageProvider } from '@/context/blurImageContext';
import type { BlurredImagesByYear } from '@/types/data.type';
import WorksNav from './_components/WorksNav';

async function getData(): Promise<BlurredImagesByYear> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/image`);

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    console.error('API 호출 실패:', response.status, response.statusText);
    return {}; // 빈 객체 반환으로 fallback
  } catch (error) {
    console.error('getData 에러:', error);
    return {}; // 빈 객체 반환으로 fallback
  }
}

export default async function WorksLayout({ children }: { children: React.ReactNode }) {
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
