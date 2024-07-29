import User from "../models/authUserModel.js";
import Orders from "../models/ordersModel.js"; // Ensure this is being used or remove it
import { createSecretToken } from "../SecretToken.js";
import bcrypt from "bcryptjs";

export const Signup = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name) return res.status(400).send({ error: "Name is required" });
    if (!email) return res.status(400).send({ error: "Email is required" });
    if (!password) return res.status(400).send({ error: "Password is required" });
    if (!phone) return res.status(400).send({ error: "Phone number is required" });
    if (!address) return res.status(400).send({ error: "Address is required" });

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).send({
        success: true,
        message: "Account already exists, please LOGIN.",
      });
    }

    const bcryptSalt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });


    res.status(201).send({
      message: "User signed up successfully",
      success: true,
      user,
    });

    next();
  } catch (err) {
    console.log("Signup Error:", err);
    res.status(500).send({
      success: false,
      message: "Error during Registration",
      error: err.message,
    });
  }
};



export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "Email not yet registered",
      });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(200).json({ message: "Incorrect email or password" });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });
    res
      .status(200)
      .json({ message: "User logged in successfully", success: true, user, token });
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in login!",
      err,
    });
  }
};


export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Internal server error" });
  }
};

export const profileUpdateController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await User.findById(req.user._id);

    if (password && password.length < 7) {
      return res.json({ error: "Password with a length greater than 7 characters is required." });
    }

    const bcryptSalt = bcrypt.genSaltSync(12);
    const hashedPassword = password ? bcrypt.hashSync(password, bcryptSalt) : undefined;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "User Profile Successfully Updated.",
      updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Error! User Profile Not Successfully Updated.",
      err,
    });
  }
};


export const getOrdersController = async (req, res) => {
  try {
    const orders = await Orders
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error Getting Orders.",
      err,
    });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Orders
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error Getting Orders.",
      err,
    });
  }
};


export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await Orders.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error While Updating Order",
      err,
    });
  }
};

