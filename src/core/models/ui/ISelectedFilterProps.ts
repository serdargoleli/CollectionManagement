export interface FilterValue {
  value: string;
  valueName: string | null;
}

export interface Filter {
  id: string;
  title: string;
  values: FilterValue[];
}

export interface SelectedValues {
  [filterId: string]: string;
}

export interface SelectedFilterProps {
  selectedValues: SelectedValues;
  filterData?: { data: Filter[] };
}
