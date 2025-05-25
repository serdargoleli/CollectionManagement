import { create } from "zustand";
import { IProductDetailModel } from "@/core/models/ICollectionDetailModel";
import { CollectionDetailState } from "@/core/models/store/ICollectionStoreModel";

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

  reorderConstants: (sourceIndex: number, destinationIndex: number) => {
    set((state) => {
      const newConstants = Array.from(state.constants);
      const [reorderedItem] = newConstants.splice(sourceIndex, 1);
      newConstants.splice(destinationIndex, 0, reorderedItem);

      return {
        ...state,
        constants: newConstants,
      };
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
