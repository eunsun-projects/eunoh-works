import { promises as fs } from 'node:fs';
import { join } from 'node:path';
export async function GET() {
  const filePath = join(process.cwd(), 'public', 'assets', 'models', 'sonny_high.glb');
  // 파일 읽기
  const fileBuffer = await fs.readFile(filePath);

  // 응답 반환
  return new Response(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': fileBuffer.length.toString(),
    },
  });
}
