import { Request, Response } from "express";
import { AssetService } from "../services/AssetService";

export class AssetController {
  private assetService: AssetService;

  constructor() {
    this.assetService = new AssetService();
  }

  async create(req: Request, res: Response): Promise<Response> {
    const asset = await this.assetService.create(req.userId, req.body);
    return res.status(201).json(asset);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const assets = await this.assetService.findByUser(req.userId);
    return res.json(assets);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const asset = await this.assetService.findById(req.params.id, req.userId);
    return res.json(asset);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const asset = await this.assetService.update(req.params.id, req.userId, req.body);
    return res.json(asset);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    await this.assetService.delete(req.params.id, req.userId);
    return res.status(204).send();
  }
}