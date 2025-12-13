import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { QUERY_KEY_VIEWER } from "@/constants/query.constant";
import type { ViewerData } from "@/types/viwer.type";
import { createClient } from "@/utils/supabase/server";
import WorksViewerTemplate from "./_components/WorksViewerTemplate";

export const dynamic = "force-dynamic";

async function getViewerData(): Promise<ViewerData[]> {
	try {
		const supabase = createClient();
		const { data, error } = await supabase
			.from("viewer")
			.select("*")
			.order("number", { ascending: true });

		if (error) {
			console.error("Supabase 에러:", error.message);
			return [];
		}

		return data || [];
	} catch (error) {
		console.error("getViewerData 에러:", error);
		return [];
	}
}

async function WorksViewerPage() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [QUERY_KEY_VIEWER],
		queryFn: () => getViewerData(),
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<Suspense fallback={<Loading />}>
			<HydrationBoundary state={dehydratedState}>
				<WorksViewerTemplate />
			</HydrationBoundary>
		</Suspense>
	);
}

export default WorksViewerPage;
