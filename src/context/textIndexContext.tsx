"use client";
import { ContextValueType } from "@/types/texts.type";
import { createContext, useMemo, useState } from "react";

const initialState: ContextValueType = { index: 0, curr: null, setAction: { setPage: () => {}, setCurrNum: () => {} } };

const CounterContext = createContext<ContextValueType>(initialState);

function TextIndexProvider({ children }: { children: React.ReactNode }) {
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

    return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>;
}

export { CounterContext, TextIndexProvider };
