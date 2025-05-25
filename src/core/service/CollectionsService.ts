import { ENDPOINTS_PATH } from "@/core/constants/endpoints";
import { axiosInstance } from "@/core/service/AxiosInstance";
import { ICollectionListResponseModel } from "@/core/models/ICollectionModel";
import { useCollectionStore } from "@/core/store/useCollectionStore";
import { IProductListData } from "@/core/models/ICollectionDetailModel";
import { IResponseModel } from "@/core/models/IResponseModel";
import { IFilterItemModel } from "@/core/models/ICollectionFilterModel";

export class CollectionService {
  async list(page = 0, perpage = 15): Promise<any> {
    const queryParams = `page=${page + 1}&pageSize=${perpage}`;
    const fetchGetData = await axiosInstance().get(`${ENDPOINTS_PATH.COLLECTIONS}?${queryParams}`);
    const response = fetchGetData.data as ICollectionListResponseModel;

    if (response.meta.page == 1 && useCollectionStore.getState().collections == null) {
      useCollectionStore.getState().setCollections(response);
    }
    return response;
  }

  async detail(id: string, payload: any): Promise<any> {
    const fetchGetData = await axiosInstance().post(ENDPOINTS_PATH.COLLECTION_EDIT(id), payload);
    return fetchGetData.data as IResponseModel<IProductListData>;
  }

  async filters(id: string): Promise<any> {
    const fetchGetData = await axiosInstance().get(ENDPOINTS_PATH.COLLECTION_FILTERS(id) + "?pageSize=5");
    return fetchGetData.data as IResponseModel<IFilterItemModel[]>;
  }
}
