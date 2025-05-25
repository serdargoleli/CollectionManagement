import { IProductDetailModel } from "@/core/models/ICollectionDetailModel";

export interface ProductCardProps {
  product: IProductDetailModel;
  isConstant?: boolean; // Sabit kartı mı yoksa normal kart mı
}
