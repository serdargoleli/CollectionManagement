export interface IFilterValue {
  value: string;
  valueName: string;
}

export interface IFilterItemModel {
  id: string;
  title: string;
  values: IFilterValue[];
  currency: string | null;
  comparisonType: number;
}
