import ProductModel from "../models/productModel.js";
import CategoryModel from "../models/categoryModel.js";
import Orders from "../models/ordersModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";


const { BRAINTREE_MERCHANT_ID, BRAINTREE_PUBLIC_KEY, BRAINTREE_PRIVATE_KEY } = process.env;

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: BRAINTREE_MERCHANT_ID,
    publicKey: BRAINTREE_PUBLIC_KEY,
    privateKey: BRAINTREE_PRIVATE_KEY,
});


export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files;

        if (!name) return res.status(500).send({ error: "Name is required" });
        if (!description) return res.status(500).send({ error: "Description is required" });
        if (!price) return res.status(500).send({ error: "Price is required" });
        if (!category) return res.status(500).send({ error: "Category is required" });
        if (!quantity) return res.status(500).send({ error: "Quantity is required" });
        if (photo && photo.size > 1000000) return res.status(400).send({ error: "Photo should be less than 1MB" });

        const newProduct = new ProductModel({ ...req.fields, slug: slugify(name) });

        if (photo) {
            newProduct.photo.data = fs.readFileSync(photo.path);
            newProduct.photo.contentType = photo.type;
        }

        await newProduct.save();

        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            product: newProduct,
        });
    } catch (err) {
        console.error("Error in creating product:", err);
        res.status(500).send({
            success: false,
            error: err.message || "Error in creating product",
        });
    }
};


export const getProductController = async (req, res) => {
    try {
        const products = await ProductModel
            .find({})
            .select("-photo")
            .populate("category")
            .limit(12)
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "All products retrieved successfully",
            products,
        });
    } catch (err) {
        console.log("Error in getting products:", err);
        res.status(500).json({
            success: false,
            message: "Error in getting products",
            err: err.message,
        });
    }
};

export const getSingleProductController = async (req, res) => {
    try {
        const product = await ProductModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");

        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Required Product Fetched",
            product,
        });
    } catch (err) {
        console.log("Error in getting product:", err);
        res.status(500).send({
            success: false,
            message: "Error while getting the product",
            err,
        });
    }
};


export const productPhotoController = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.pid).select("photo");
        
        if (product.photo && product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        } else {
            return res.status(404).send({
                success: false,
                message: "Photo not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
};

export const deleteProductController = async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.pid);
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};


export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    if (!name) return res.status(500).send({ error: "Name is required" });
    if (!description) return res.status(500).send({ error: "Description is required" });
    if (!price) return res.status(500).send({ error: "Price is required" });
    if (!category) return res.status(500).send({ error: "Category is required" });
    if (!quantity) return res.status(500).send({ error: "Quantity is required" });
    if (photo && photo.size > 10000000) return res.status(400).send({ error: "Photo should be less than 1MB" });

    const products = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (!products) {
      return res.status(404).send({ error: "Product not found" });
    }

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Updating product",
    });
  }
};

export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await ProductModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error Filtering Products",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
    try {
      const total = await ProductModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error,
        success: false,
      });
    }
  };
  

export const productListController = async (req, res) => {
    try {
      const perPage = 6;
      const page = req.params.page ? req.params.page : 1;
      const products = await ProductModel
        .find({})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error loading the pages",
        error,
      });
    }
  };
  

export const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const result = await ProductModel
        .find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-photo");
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };
  

export const relatedProductController = async (req, res) => {
    try {
      const { pid, cid } = req.params;
      const products = await ProductModel.find({category: cid, _id: { $ne: pid } })
        .select("-photo")
        .limit(3)
        .populate("category");
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error Encountered Getting Related Product",
        error,
      });
    }
  };
  

export const productCategoryController = async (req, res) => {
    try {
      const category = await CategoryModel.findOne({ slug: req.params.slug });
      const products = await ProductModel.find({ category }).populate("category");
      res.status(200).send({
        success: true,
        category,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error Encountered Getting Products",
      });
    }
  };
  

export const tokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function(error, result) {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send(result);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in generating token", 
      });
    }
  };
  

export const paymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;

    if (!nonce || !cart || !Array.isArray(cart)) {
      return res.status(400).json({ error: "Invalid request data" });
    }
    
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    const { result } = await gateway.transaction.sale({
      amount: total,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    });

    if (result.success) {
      const order = new Orders({
        products: cart,
        payment: result.transaction,
        buyer: req.user._id,
      });
      await order.save();

      return res.json({ ok: true });
    } else {
      return res.status(500).json({ error: result.message });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal server error" });
  }
};

export const cashOnDeliveryController = async (req, res) => {
  try {
    const { cart, user } = req.body;

    if (!cart || !Array.isArray(cart)) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    const order = new Orders({
      products: cart,
      payment: "Cash On Delivery",
      buyer: user._id,
    });

    await order.save();

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal server error" });
  }
};