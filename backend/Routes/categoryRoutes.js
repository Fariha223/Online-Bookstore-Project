import express from 'express';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import {
  createCategoryController,
  updateCategoryController,
  getcategoryController,
  singleCategoryController,
  deleteCategoryController
} from '../Controllers/CategoryController.js';

const router = express.Router();

router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

router.get('/get-category', getcategoryController);

router.get('/single-category', singleCategoryController);

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

export default router;
