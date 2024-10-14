import { ViewerData } from "@/types/viwer.type";
import fetchWrapper from "@/utils/common/fetchWrapper";

export async function getViewer() {
  const url = "/api/viewer";
  try {
    const response = await fetchWrapper<ViewerData[]>(url, {
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
}
