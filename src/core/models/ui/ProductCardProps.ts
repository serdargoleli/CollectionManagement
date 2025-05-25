import { IProductDetailModel } from "@/core/models/ICollectionDetailModel";

export interface ProductCardProps {
  product: IProductDetailModel;
  isConstant?: boolean;
  sortableId?: string;
}
