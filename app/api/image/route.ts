import { worksData } from '@/data/worksData';
import type { BlurredImagesByYear } from '@/types/data.type';
import getBlurredImageAsBase64 from '@/utils/works/getBlurredImgAsBase64';
import { NextResponse } from 'next/server';

export async function GET() {
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

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
