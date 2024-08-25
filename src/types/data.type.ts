export type Year = {
    value: number;
    year: string;
    href: string;
};

export interface Work {
    value: number;
    src: string;
    txt: string;
}

export type WorksByYear = {
    [year: string]: Work[];
};

export type Plaiceholder = {
    img: {
        imgPath: string;
        height: number;
        width: number;
    };
    color: {
        r: number;
        g: number;
        b: number;
        hex: string;
    };
    css: {
        backgroundImage: string;
        backgroundPosition: string;
        backgroundSize: string;
        backgroundRepeat: string;
    };
    base64: string;
    pixels: {}[][];
};
[];

export type BlurredImage = {
    width: number;
    height: number;
    base64: string;
};

export type BlurredImagesByYear = {
    [year: string]: BlurredImage[];
};
