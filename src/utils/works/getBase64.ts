import { promises as fs } from "fs";
import { join } from "path";
import { getPlaiceholder } from "plaiceholder";

export const getBase64 = async (imgPath: string) => {
    try {
        const filePath = join(process.cwd(), "public", imgPath);

        const file = await fs.readFile(filePath);
        const {
            metadata: { height, width },
            ...plaiceholder
        } = await getPlaiceholder(file, { size: 4 });
        return {
            ...plaiceholder,
            img: { imgPath, height, width },
        };
    } catch (error: unknown) {
        //error handling
        if (error instanceof Error) return error.message;
        else if (error && typeof error === "object" && "message" in error)
            return error.message as string;
        else if (typeof error === "string") return error;
        else return "Unexpected error!";
    }
};
