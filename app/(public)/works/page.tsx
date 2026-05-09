import { Suspense } from "react";
import { basicMeta } from "@/app/basicMeta";
import Loading from "@/app/loading";
import WorksMain from "./_components/WorksMain";

export const metadata = basicMeta;
export const dynamic = "force-static";

export default function WorksPage() {
	return (
		<Suspense fallback={<Loading />}>
			<WorksMain />
		</Suspense>
	);
}
