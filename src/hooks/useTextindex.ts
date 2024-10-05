import { CounterContext } from "@/context/textIndexContext";
import { useContext } from "react";

function useTextIndex() {
    const value = useContext(CounterContext);
    if (value === undefined) {
        throw new Error("useCounterState should be used within CounterProvider");
    }
    return value;
}

export default useTextIndex;
