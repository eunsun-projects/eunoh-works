import { promises as fs } from "fs";
import { join } from "path";
import sharp from "sharp";

// 이미지를 리사이즈하고 블러 처리한 후 base64로 인코딩하는 함수
async function getBlurredImageAsBase64(imgPath: string) {
    const filePath = join(process.cwd(), "public", imgPath);

    // 이미지 파일을 읽어들임
    const imageBuffer = await fs.readFile(filePath);

    // 원본 이미지의 메타데이터를 가져와 width와 height 확인
    const { width, height } = await sharp(imageBuffer).metadata();

    // 이미지를 작은 크기로 리사이즈하고 블러 처리
    const resizedBuffer = await sharp(imageBuffer)
        .resize(20, 20) // 작은 크기로 리사이즈
        .blur(4) // 블러 처리
        .toBuffer();

    // base64로 인코딩하여 반환
    const base64 = `data:image/jpeg;base64,${resizedBuffer.toString("base64")}`;

    // 원본 width, height, base64 데이터를 객체 형태로 반환
    return {
        width: width as number,
        height: height as number,
        base64,
    };
}

export default getBlurredImageAsBase64;
