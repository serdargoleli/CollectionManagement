import { create } from "zustand";
import { IProductDetailModel } from "@/core/models/ICollectionDetailModel";

interface CollectionDetailState {
  constants: IProductDetailModel[];
  addToConstants: (product: IProductDetailModel) => void;
  removeFromConstants: (productCode: string) => void;
  clearConstants: () => void;
  isInConstants: (productCode: string, colorCode: string) => boolean;
}

export const useCollectionDetail = create<CollectionDetailState>((set, get) => ({
  constants: [],

  addToConstants: (product: IProductDetailModel) => {
    const { constants, isInConstants } = get();

    // Zaten varsa ekleme
    if (isInConstants(product.productCode, product.colorCode)) {
      return;
    }

    set({
      constants: [...constants, product],
    });
  },

  removeFromConstants: (productCode: string) => {
    const { constants } = get();
    set({
      constants: constants.filter((product) => product.productCode !== productCode),
    });
  },

  clearConstants: () => {
    set({ constants: [] });
  },

  isInConstants: (productCode: string, colorCode: string) => {
    const { constants } = get();
    return constants.some((product) => product.productCode === productCode && product.colorCode === colorCode);
  },
}));
