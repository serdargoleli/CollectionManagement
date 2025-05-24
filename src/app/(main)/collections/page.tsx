"use client";

import { CollectionService } from "@/core/service/CollectionsService";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ICollectionListResponseModel } from "@/core/models/ICollectionModel";
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { NAVIGATION } from "@/core/constants/navigation";

const CollectionsPage = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<ICollectionListResponseModel | null>(null);
  const __collectionService = new CollectionService();

  useEffect(() => {
    if (!token) return;
    getAllCollections();
  }, [token]);

  const getAllCollections = async () => {
    setLoading(true);
    const response: ICollectionListResponseModel = await __collectionService.getAllCollections(token);
    setCollections(response);
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <Box className="flex flex-col items-center justify-center gap-y-2 pt-5">
          <CircularProgress />
          <Typography>Kayıtlar yükleniyor...</Typography>
        </Box>
      ) : (
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
                    <Link href={NAVIGATION.COLLECTION_EDIT(row.id)}>
                      <BorderColorIcon fontSize="small" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default CollectionsPage;
