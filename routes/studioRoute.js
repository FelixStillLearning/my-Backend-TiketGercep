import express from "express";
import {
  getStudios,
  getStudioById,
  createStudio,
  updateStudio,
  deleteStudio,
} from "../controllers/studioControllers.js";

const router = express.Router();

router.get("/studios", getStudios);
router.get("/studios/:id", getStudioById);
router.post("/studios", createStudio);
router.put("/studios/:id", updateStudio);
router.patch("/studios/:id", updateStudio);
router.delete("/studios/:id", deleteStudio);

export default router;