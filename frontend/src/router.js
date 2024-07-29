import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import SignUp from "./auth/Signup";
import Login from "./auth/Login";
import About from "./views/About";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/cartContext";
import CreateCategory from "./components/admin/createCategory";
import Contact from "./views/Contact";
import AdminRoute from "./components/AdminRoutes";
import AdminProfile from "./components/admin/adminProfile";
import CreateProduct from "./components/admin/createProduct";
import Products from "./components/admin/product";
import UpdateProduct from "./components/admin/updateProduct";
import AdminOrders from "./components/admin/adminOrders";
import ProtectedRoute from "./components/ProtectedRoutes";
import Search from "./views/searchProduct";
import UserProfile from "./components/user/UserProfile";
import Orders from "./components/user/Orders";
import Category from "./views/Category";
import BookPage from "./views/BookPage";
import ProductDetails from "./views/ProductDetails";
import { SearchProvider } from "./context/searchContext";
import CartPage from "./components/cart/cartPage";

const AppRouter = () => (
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/bookpage" element={<BookPage />} />
            <Route path="product/:slug" element={<ProductDetails />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/dashboard" element={<AdminRoute />}>
              <Route path="admin/profile" element={<AdminProfile />} />
              <Route
                path="admin/create-category"
                element={<CreateCategory />}
              />
              <Route path="admin/create-product" element={<CreateProduct />} />
              <Route path="admin/products" element={<Products />} />
              <Route path="admin/product/:slug" element={<UpdateProduct />} />
              <Route path="admin/orders" element={<AdminOrders />} />
            </Route>
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route path="user/profile" element={<UserProfile />} />
              <Route path="user/orders" element={<Orders />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);

export default AppRouter;
