"use client";
import { ContextValueType } from "@/types/texts.type";
import { createContext, useMemo, useState } from "react";

const initialState: ContextValueType = { index: 0, curr: null, setAction: { setPage: () => {}, setCurrNum: () => {} } };

const TextPaginationContext = createContext<ContextValueType>(initialState);

function TextPaginationProvider({ children }: { children: React.ReactNode }) {
    const [index, setIndex] = useState(0);
    const [curr, setCurr] = useState<number | null>(null);
    const setAction = useMemo(
        () => ({
            setPage: (index: number) => setIndex(index),
            setCurrNum: (index: number | null) => setCurr(index),
        }),
        []
    );

    const value: ContextValueType = useMemo(() => ({ index, curr, setAction }), [index, curr, setAction]);

    return <TextPaginationContext.Provider value={value}>{children}</TextPaginationContext.Provider>;
}

export { TextPaginationContext, TextPaginationProvider };

