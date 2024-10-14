import { getViewer } from "@/apis/getViewer.apis";
import Loading from "@/app/loading";
import { QUERY_KEY_VIEWER } from "@/constants/query.constant";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import WorksViewerTemplate from "./_components/WorksViewerTemplate";

async function WorksViewerPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_VIEWER],
    queryFn: () => getViewer(),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<Loading />}> 
      <HydrationBoundary state={dehydratedState}>
        <WorksViewerTemplate />
      </HydrationBoundary>
    </Suspense>
  )
}

export default WorksViewerPage
