import CategoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }

    const existingCategory = await CategoryModel.findOne({ name });

    if (existingCategory) {
      return res.status(409).send({ error: "Category already exists" });
    }

    const category = await CategoryModel.create({
      name,
      slug: slugify(name),
    });

    return res.status(200).send({ message: "New category created", category });
  } catch (error) {
    console.error("Error in Category Controller:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const getcategoryController = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category: categories,
    });
  } catch (error) {
    console.error("Error while getting all categories:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};


export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.error("Error while deleting category:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({ error: "Category not found" });
    }

    return res.status(200).send({ message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    console.error("Error while updating category:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
};


export const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Get Single Category Successfully",
      category,
    });
  } catch (error) {
    console.error("Error while getting single category:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category",
    });
  }
};

