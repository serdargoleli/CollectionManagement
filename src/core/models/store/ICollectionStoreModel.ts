import { ICollectionListResponseModel } from "@/core/models/ICollectionModel";

export interface ICollectionStoreModel {
  collections: ICollectionListResponseModel | null;
  setCollections: (data: ICollectionListResponseModel) => void;
  getCollections: () => ICollectionListResponseModel | null;
}
