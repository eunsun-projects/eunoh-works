import { TextIndexProvider } from "@/context/textIndexContext";

export default function TextsLayout({ children }: { children: React.ReactNode }) {
    return <TextIndexProvider>{children}</TextIndexProvider>;
}
