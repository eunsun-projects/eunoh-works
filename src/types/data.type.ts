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
