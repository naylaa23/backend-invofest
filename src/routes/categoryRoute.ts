import express from "express";

import { 
    getAllCategories, 
    createCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} from "../controllers/categoryController.js"; 

const router = express.Router();

router.get("/", getAllCategories); 
router.post("/", createCategory); //2.menyimpan data category baru
router.get("/:id", getCategoryById); //3.menampilkan data category berdasarkan id
router.put("/:id", updateCategoryById); 
router.delete("/:id", deleteCategoryById); 

export default router;
