import { ENDPOINTS_PATH } from "@/core/constants/endpoints";
import { axiosInstance } from "@/core/service/AxiosInstance";
import { ICollectionListResponseModel } from "@/core/models/ICollectionModel";

export class CollectionService {
  async getAllCollections(token: string | undefined): Promise<any> {
    const queryParams = "page=1&pageSize=15";
    const response = await axiosInstance(token).get(`${ENDPOINTS_PATH.COLLECTIONS}?${queryParams}`);
    return response.data as ICollectionListResponseModel;
  }
}
