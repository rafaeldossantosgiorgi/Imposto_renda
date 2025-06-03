import api from "./api";
import { Asset, AssetType } from "../types/asset";

export const assetService = {
  listAssets: async (): Promise<Asset[]> => {
    const response = await api.get("/assets");
    return response.data;
  },

  getAsset: async (id: string): Promise<Asset> => {
    const response = await api.get(`/assets/${id}`);
    return response.data;
  },

  createAsset: async (data: Partial<Asset>): Promise<Asset> => {
    const response = await api.post("/assets", data);
    return response.data;
  },

  updateAsset: async (id: string, data: Partial<Asset>): Promise<Asset> => {
    const response = await api.put(`/assets/${id}`, data);
    return response.data;
  },

  deleteAsset: async (id: string): Promise<void> => {
    await api.delete(`/assets/${id}`);
  },
};