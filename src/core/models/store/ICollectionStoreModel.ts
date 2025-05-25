import { ICollectionListResponseModel } from "@/core/models/ICollectionModel";
import { IProductDetailModel } from "@/core/models/ICollectionDetailModel";

export interface ICollectionStoreModel {
  collections: ICollectionListResponseModel | null;
  setCollections: (data: ICollectionListResponseModel) => void;
  getCollections: () => ICollectionListResponseModel | null;
}

export interface CollectionDetailState {
  constants: IProductDetailModel[];
  addToConstants: (product: IProductDetailModel) => void;
  removeFromConstants: (productCode: string) => void;
  clearConstants: () => void;
  isInConstants: (productCode: string, colorCode: string) => boolean;
}
