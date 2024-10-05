import { TextPaginationContext } from "@/context/textPaginationContext";
import { useContext } from "react";

function usePagination() {
    const value = useContext(TextPaginationContext);
    if (value === undefined) {
        throw new Error("useCounterState should be used within CounterProvider");
    }
    return value;
}

export default usePagination;
