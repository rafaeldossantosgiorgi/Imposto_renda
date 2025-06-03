import { Router } from "express";
import { AssetController } from "../controllers/AssetController";
import { authMiddleware } from "../middlewares/auth";

const assetRouter = Router();
const assetController = new AssetController();

assetRouter.use(authMiddleware);

assetRouter.post("/", assetController.create.bind(assetController));
assetRouter.get("/", assetController.list.bind(assetController));
assetRouter.get("/:id", assetController.show.bind(assetController));
assetRouter.put("/:id", assetController.update.bind(assetController));
assetRouter.delete("/:id", assetController.delete.bind(assetController));

export { assetRouter };