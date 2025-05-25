export interface Filter {
  id: string;
  value: string;
  comparisonType: number;
}

export interface CollectionRequestPayload {
  additionalFilters: Filter[];
  page: number;
  pageSize: number;
}

export interface IProductListMeta {
  page: number;
  pageSize: number;
  totalProduct: number;
}

export interface IProductDetailModel {
  productCode: string;
  colorCode: string;
  name: string;
  outOfStock: boolean;
  isSaleB2B: boolean;
  imageUrl: string;
}

export interface IProductListData {
  meta: IProductListMeta;
  data: IProductDetailModel[];
}
