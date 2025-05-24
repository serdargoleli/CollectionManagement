import { create } from "zustand";
import { ICollectionListResponseModel } from "@/core/models/ICollectionModel";

interface CollectionStore {
  collections: ICollectionListResponseModel | null;
  setCollections: (data: ICollectionListResponseModel) => void;
  getCollections: () => ICollectionListResponseModel | null;
}

export const useCollectionStore = create<CollectionStore>((set, get) => ({
  collections: null,

  setCollections: (data: ICollectionListResponseModel) => {
    set({ collections: data });
  },

  getCollections: () => {
    return get().collections;
  },
}));
