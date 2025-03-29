import express from "express";

import { getProducts, createProduct, updateProduct, deleteProduct, findProductById } from '../controllers/product.controller.js';
const router = express.Router();

router.get("/products", getProducts)

router.post("/product", createProduct)

router.put("/product/:id", updateProduct)

router.delete("/product/:id", deleteProduct)

router.get("/product/find", findProductById)

export default router;