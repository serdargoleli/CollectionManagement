export interface ICollectionFilterModel {
  id: string;
  title: string;
  value: string;
  valueName: string;
  currency: string | null;
  comparisonType: number;
}

export interface ICollectionFiltersGroupModel {
  useOrLogic: boolean;
  filters: ICollectionFilterModel[];
}

export interface ICollectionInfoModel {
  id: number;
  name: string;
  description: string;
  url: string;
  langCode: string;
}

export interface ICollectionItemModel {
  id: number;
  filters: ICollectionFiltersGroupModel;
  type: number;
  info: ICollectionInfoModel;
  salesChannelId: number;
  products: any | null; // Eğer products tipini biliyorsan ona göre düzeltilebilir
}

export interface Meta {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ICollectionListResponseModel {
  meta: Meta;
  data: ICollectionItemModel[];
}
