import { TextPaginationProvider } from "@/context/textPaginationContext";

export default function TextsLayout({ children }: { children: React.ReactNode }) {
    return <TextPaginationProvider>{children}</TextPaginationProvider>;
}
