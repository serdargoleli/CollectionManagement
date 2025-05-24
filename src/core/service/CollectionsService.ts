import { ENDPOINTS_PATH } from "@/core/constants/endpoints";
import { axiosInstance } from "@/core/service/AxiosInstance";
import { ICollectionListResponseModel } from "@/core/models/ICollectionModel";
import { useCollectionStore } from "@/core/store/useCollectionStore";

export class CollectionService {
  async getAllCollections(page = 0, perpage = 15): Promise<any> {
    const queryParams = `page=${page + 1}&pageSize=${perpage}`;
    const fetchGetData = await axiosInstance().get(`${ENDPOINTS_PATH.COLLECTIONS}?${queryParams}`);
    const response = fetchGetData.data as ICollectionListResponseModel;
    console.log(response);
    if (response.meta.page == 1 && useCollectionStore.getState().collections == null) {
      useCollectionStore.getState().setCollections(response);
    }
    return response;
  }
}
