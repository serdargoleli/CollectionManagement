"use client";
import React, { use, useEffect, useState } from "react";
import { CollectionService } from "@/core/service/CollectionsService";
import { IResponseModel } from "@/core/models/IResponseModel";
import { IProductDetailModel, IProductListData } from "@/core/models/ICollectionDetailModel";
import { Alert, Button, CircularProgress, Typography } from "@mui/material";
import ProductCard from "@/components/ProductCard";
import { useCollectionDetail } from "@/core/store/useCollectionDetailStore";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<IResponseModel<IProductListData> | null>(null);
  const { constants, clearConstants } = useCollectionDetail();
  const __collectionService = new CollectionService();

  useEffect(() => {
    getCollectionDetail();
    return () => {
      clearConstants();
    };
  }, []);

  const getCollectionDetail = async () => {
    setLoading(true);
    const collectionDetail: IResponseModel<IProductListData> = await __collectionService.detail(id);
    setDetails(collectionDetail);
    setLoading(false);
  };

  const isDataLength = (): boolean => {
    return !!(details && details.data && details.data.data.length > 0);
  };

  return (
    <div className="edit-page">
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
                <Button variant="outlined" size="small" onClick={clearConstants}>
                  Vazgeç
                </Button>
                <Button variant="contained" size="small">
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
              <div className="constants-cards">
                {constants.map((product: IProductDetailModel, index: any) => (
                  <ProductCard key={`constant-${index}-${product.productCode}`} product={product} isConstant={true} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
