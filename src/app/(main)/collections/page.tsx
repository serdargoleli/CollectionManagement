"use client";
import { CollectionService } from "@/core/service/CollectionsService";
import { useEffect, useRef, useState } from "react";
import { ICollectionListResponseModel } from "@/core/models/ICollectionModel";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import { NAVIGATION } from "@/core/constants/navigation";
import { useCollectionStore } from "@/core/store/useCollectionStore";
import NextLink from "next/link";

const CollectionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<ICollectionListResponseModel | null>(null);
  const collectionsState = useCollectionStore((state) => state.collections);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const prevRowsPerPageRef = useRef(15);

  useEffect(() => {
    if (page == 0 && collectionsState && rowsPerPage && prevRowsPerPageRef.current === rowsPerPage) {
      setCollections(collectionsState);
      setLoading(false);
    } else {
      getAllCollections(page, rowsPerPage);
    }
    prevRowsPerPageRef.current = rowsPerPage;
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const getAllCollections = async (page = 0, perPage = 15) => {
    setLoading(true);
    const __collectionService = new CollectionService();
    const response: ICollectionListResponseModel = await __collectionService.getAllCollections(page, perPage);
    setCollections(response);
    setLoading(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} className="text-sm">
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell>Ürün No</TableCell>
              <TableCell>Koleksiyon Adı</TableCell>
              <TableCell>Ürün Açıklaması</TableCell>
              <TableCell>Satış Kanalı</TableCell>
              <TableCell align="center">İşlemler</TableCell>
            </TableRow>
          </TableHead>

          {loading ? (
            <TableBody className="flex flex-col items-center justify-center gap-y-2 pt-5">
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex flex-col items-center justify-center gap-y-3">
                    <CircularProgress />
                    <Typography>Kayıtlar yükleniyor...</Typography>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <>
              <TableBody>
                {collections?.data.map((row) => (
                  <TableRow key={row.info.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.info.name}</TableCell>

                    <TableCell dangerouslySetInnerHTML={{ __html: row.info.description }} style={{ fontSize: "inherit", margin: 0, padding: 0 }} />
                    <TableCell>{row.salesChannelId}</TableCell>
                    <TableCell align="center">
                      <NextLink href={NAVIGATION.COLLECTION_EDIT(row.id)}>
                        <BorderColorIcon fontSize="small" />
                      </NextLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[15, 25, 50]}
                    colSpan={5}
                    count={collections?.meta?.totalCount || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Sayfa başına satır:"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count !== -1 ? count : `${to}'den fazla`}`}
                  />
                </TableRow>
              </TableFooter>
            </>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default CollectionsPage;
