interface SetAction {
    setPage: (index: number) => void;
    setCurrNum: (index: number | null) => void;
}

export type ContextValueType = { index: number; curr: number | null; setAction: SetAction };

export type TextType = { [key: string]: string | number | null };

export interface TextProps {
    posts: TextType[];
}

export interface PaginationProps {
    totalPage: TextType[];
    limit: number;
    page: number;
    curr: number | null;
}
