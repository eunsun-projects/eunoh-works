"use client";

import { BlurredImagesByYear } from "@/types/data.type";
import { createContext, useContext, useEffect, useState } from "react";

const BlurImageContext = createContext<BlurredImagesByYear>({});

export const useBlurImageContext = () => useContext(BlurImageContext);

function BlurImageProvider({
    children,
    blurredImagesFromServer,
}: {
    children: React.ReactNode;
    blurredImagesFromServer: BlurredImagesByYear;
}) {
    const [blurredImages, setBlurredImages] = useState<BlurredImagesByYear>(
        blurredImagesFromServer
    );

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch("/api/image");
            const data = await response.json();
            setBlurredImages(data);
        };
        if (Object.keys(blurredImagesFromServer).length === 0) {
            fetchImages();
        }
    }, [blurredImagesFromServer]);

    return (
        <BlurImageContext.Provider value={blurredImages}>
            {children}
        </BlurImageContext.Provider>
    );
}

export { BlurImageContext, BlurImageProvider };
