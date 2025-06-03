import { AssetRepository } from "../repositories/AssetRepository";
import { UserService } from "./UserService";
import { Asset } from "../entities/Asset";
import { AppError } from "../errors/AppError";

export class AssetService {
  private assetRepository: AssetRepository;
  private userService: UserService;

  constructor() {
    this.assetRepository = new AssetRepository();
    this.userService = new UserService();
  }

  async create(userId: string, assetData: Partial<Asset>): Promise<Asset> {
    const user = await this.userService.findById(userId);
    
    return this.assetRepository.create({
      ...assetData,
      user
    });
  }

  async findById(id: string, userId: string): Promise<Asset> {
    const asset = await this.assetRepository.findById(id);

    if (!asset || asset.user.id !== userId) {
      throw new AppError("Asset not found", 404);
    }

    return asset;
  }

  async findByUser(userId: string): Promise<Asset[]> {
    return this.assetRepository.findByUser(userId);
  }

  async update(id: string, userId: string, data: Partial<Asset>): Promise<Asset> {
    const asset = await this.findById(id, userId);
    return this.assetRepository.update(id, data) as Promise<Asset>;
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.findById(id, userId);
    await this.assetRepository.delete(id);
  }
}