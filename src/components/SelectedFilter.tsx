import { Chip, Stack } from "@mui/material";
import { SelectedFilterProps } from "@/core/models/ui/ISelectedFilterProps";

export const renderSelectedFilters = ({ selectedValues, filterData }: SelectedFilterProps) => {
  if (!filterData?.data || filterData === null) return null;

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {Object.entries(selectedValues).map(([filterId, selectedValue]) => {
        const filter = filterData.data.find((f) => f.id === filterId);
        const value = filter?.values.find((v) => v.value === selectedValue);

        return <Chip key={filterId} label={`${filter?.title || filterId}: ${value?.valueName || selectedValue}`} color="primary" variant="outlined" />;
      })}
    </Stack>
  );
};
