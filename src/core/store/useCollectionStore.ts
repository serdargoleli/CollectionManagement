import { create } from "zustand";
import { ICollectionListResponseModel } from "@/core/models/ICollectionModel";
import { ICollectionStoreModel } from "@/core/models/store/ICollectionStoreModel";

export const useCollectionStore = create<ICollectionStoreModel>((set, get) => ({
  collections: null,

  setCollections: (data: ICollectionListResponseModel) => {
    set({ collections: data });
  },

  getCollections: () => {
    return get().collections;
  },
}));
