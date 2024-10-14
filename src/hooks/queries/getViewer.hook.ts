import { getViewer } from "@/apis/getViewer.apis";
import { QUERY_KEY_VIEWER } from "@/constants/query.constant";
import { useQuery } from "@tanstack/react-query";

export function useViewerQuery() {
  return useQuery({
    queryKey: [QUERY_KEY_VIEWER],
    queryFn: getViewer,
  });
}
