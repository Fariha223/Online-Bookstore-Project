import express from 'express';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import {
  createProductController,
  updateProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  tokenController,
  paymentController,
  cashOnDeliveryController
} from '../controllers/productController.js';

import formidable from 'express-formidable';

const router = express.Router();

router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);

router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

router.post("/product-filters", productFiltersController);

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchProductController);

router.get("/related-product/:pid/:cid", relatedProductController);

router.get("/product-category/:slug", productCategoryController);

router.get("/token", tokenController);

router.post("/payment", requireSignIn, paymentController);

router.post("/cashondelivery", requireSignIn, cashOnDeliveryController);

export default router;
