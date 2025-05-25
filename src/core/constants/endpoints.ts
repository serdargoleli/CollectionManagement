export const ENDPOINTS_PATH = {
  LOGIN: "Auth/Login",
  COLLECTIONS: "Collection/GetAll",
  COLLECTION_EDIT: (id: string) => `Collection/${id}/GetProductsForConstants`,
};
