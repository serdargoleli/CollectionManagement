"use client";
import React, { use, useEffect, useState } from "react";
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CollectionService } from "@/core/service/CollectionsService";
import { IResponseModel } from "@/core/models/IResponseModel";
import { IProductDetailModel, IProductListData } from "@/core/models/ICollectionDetailModel";
import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import ProductCard from "@/components/ProductCard";
import { useCollectionDetail } from "@/core/store/useCollectionDetailStore";
import { IFilterItemModel } from "@/core/models/ICollectionFilterModel";
import { renderSelectedFilters } from "@/components/SelectedFilter";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { constants, clearConstants, reorderConstants } = useCollectionDetail();
  const __collectionService = new CollectionService();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<IResponseModel<IProductListData> | null>(null);
  const [filterData, setFilterData] = useState<IResponseModel<IFilterItemModel[]> | null>(null);
  const [filterVisibleDrawler, setFilterVisibleDrawer] = useState(false);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    getCollectionDetail();
    getCollectionFilter();
    return () => {
      clearConstants();
    };
  }, []);

  const handleChange = (id: string) => (event: SelectChangeEvent<string>) => {
    setSelectedValues((prev) => ({
      ...prev,
      [id]: event.target.value,
    }));
  };

  const getCollectionDetail = async (filterPayload?: any) => {
    setLoading(true);
    const payload = filterPayload || {
      additionalFilters: [],
      page: 1,
      pageSize: 36,
    };

    const collectionDetail: IResponseModel<IProductListData> = await __collectionService.detail(id, payload);
    setDetails(collectionDetail);
    setLoading(false);
  };

  const getCollectionFilter = async () => {
    const filterList: IResponseModel<IFilterItemModel[]> = await __collectionService.filters(id);
    setFilterData(filterList);
  };

  const isDataLength = (): boolean => {
    return !!(details && details.data && details.data.data.length > 0);
  };

  const resetFilter = () => {
    setSelectedValues({});
    setFilterVisibleDrawer(false);
    getCollectionDetail();
  };

  const applyFilters = () => {
    const payload = buildFilterPayload(selectedValues, filterData);
    getCollectionDetail(payload);
    setFilterVisibleDrawer(false);
  };

  const alertOpen = () => {
    setAlertMessageOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertMessageOpen(false);
  };

  const buildFilterPayload = (selectedValues: Record<string, string>, filterData: IResponseModel<IFilterItemModel[]> | null, page = 1, pageSize = 36) => {
    if (!filterData?.data) return { additionalFilters: [], page, pageSize };

    const additionalFilters = Object.entries(selectedValues).map(([filterId, selectedValue]) => {
      const filter = filterData.data.find((f) => f.id === filterId);
      return {
        id: filterId,
        value: selectedValue,
        comparisonType: filter?.comparisonType ?? 0,
      };
    });

    return {
      additionalFilters,
      page,
      pageSize,
    };
  };

  // @dnd-kit drag end handler
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = constants.findIndex((item) => `${item.productCode}-${item.colorCode}` === active.id);
      const newIndex = constants.findIndex((item) => `${item.productCode}-${item.colorCode}` === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderConstants(oldIndex, newIndex);
      }
    }
  };

  // Sortable items için unique ID'ler
  const sortableItems = constants.map((product) => `${product.productCode}-${product.colorCode}`);

  return (
    <div className="edit-page">
      <div className="col-span-12">
        <Card variant="outlined" className="flex justify-between p-3">
          {filterData ? renderSelectedFilters({ selectedValues, filterData }) : null}
          <Button onClick={() => setFilterVisibleDrawer(true)}>Filtrele</Button>
        </Card>
      </div>
      <div className={isDataLength() ? "col-span-12 md:col-span-7" : "col-span-12"}>
        <Typography variant="h5" className="mb-4">
          Koleksiyonlar
        </Typography>
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="collections-cards">
            {details?.data.data && details?.data.data.length > 0 ? (
              details?.data.data.map((product, index) => <ProductCard key={`product-${index}-${product.productCode}`} product={product} />)
            ) : (
              <Alert className="mt-4 md:col-span-3" severity="info">
                Koleksiyona henüz ürün eklenmedi.
              </Alert>
            )}
          </div>
        )}
      </div>
      <div className={isDataLength() ? "col-span-12 md:col-span-5" : "hidden"}>
        <div className="constants-box">
          <div className="mb-4 flex items-center justify-between">
            <Typography variant="h5">Sabitler ({constants.length})</Typography>
            {constants.length > 0 && (
              <div className={constants.length > 0 ? "mt-4 flex items-center justify-end gap-4" : "hidden"}>
                <Button variant="outlined" color="error" size="small" onClick={clearConstants}>
                  Tümünü Temizle
                </Button>
                <Button variant="contained" size="small" onClick={alertOpen}>
                  Kaydet
                </Button>
              </div>
            )}
          </div>
          {constants.length === 0 ? (
            <div className="not-item-box">
              <Typography color="textSecondary">Henüz sabit ürün eklenmedi</Typography>
            </div>
          ) : (
            <div className="h-[750px] overflow-y-scroll p-4">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={sortableItems} strategy={verticalListSortingStrategy}>
                  <div className="constants-cards">
                    {constants.map((product: IProductDetailModel, index: number) => (
                      <ProductCard
                        key={`constant-${index}-${product.productCode}`}
                        product={product}
                        isConstant={true}
                        sortableId={`${product.productCode}-${product.colorCode}`}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}
        </div>
      </div>

      <Drawer anchor={"right"} open={filterVisibleDrawler} onClose={() => setFilterVisibleDrawer(false)}>
        <div className="grid w-[400px] grid-cols-1 gap-4 overflow-y-scroll p-8">
          <Typography variant="h5">Filtreleme</Typography>
          {filterData?.data.slice(0, 5).map((filter) => (
            <FormControl key={filter.id} style={{ minWidth: 200 }}>
              <InputLabel id={`label-${filter.id}`}>{filter.title}</InputLabel>
              <Select labelId={`label-${filter.id}`} value={selectedValues[filter.id] || ""} label={filter.title} onChange={handleChange(filter.id)}>
                {filter.values.map((val) => (
                  <MenuItem key={val.value} value={val.value}>
                    {val.valueName || val.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}

          <div className="flex items-center justify-between gap-4">
            <Button variant="outlined" onClick={() => resetFilter()} className="w-1/2">
              Temizle
            </Button>
            <Button variant="contained" onClick={() => applyFilters()} className="w-1/2">
              Uygula
            </Button>
          </div>
        </div>
      </Drawer>

      <Snackbar open={alertMessageOpen} autoHideDuration={6000} onClose={handleClose} message="Kaydetme İşlemi Başarılı!" />
    </div>
  );
};

export default Page;
