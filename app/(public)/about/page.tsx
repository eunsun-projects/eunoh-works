import { basicMeta } from "@/app/basicMeta";
import About from "./_components/About";

export const metadata = basicMeta;
export const dynamic = "force-static";

export default function AboutPage() {
	return <About />;
}
