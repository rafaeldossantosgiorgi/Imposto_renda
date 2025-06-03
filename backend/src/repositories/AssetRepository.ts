import { Repository } from "typeorm";
import { Asset } from "../entities/Asset";
import { AppDataSource } from "../database";

export class AssetRepository {
  private repository: Repository<Asset>;

  constructor() {
    this.repository = AppDataSource.getRepository(Asset);
  }

  async findById(id: string): Promise<Asset | null> {
    return this.repository.findOne({ 
      where: { id },
      relations: ["user"]
    });
  }

  async findByUser(userId: string): Promise<Asset[]> {
    return this.repository.find({
      where: { user: { id: userId } },
      order: { createdAt: "DESC" }
    });
  }

  async create(asset: Partial<Asset>): Promise<Asset> {
    const newAsset = this.repository.create(asset);
    return this.repository.save(newAsset);
  }

  async update(id: string, data: Partial<Asset>): Promise<Asset | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}