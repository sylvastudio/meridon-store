import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "shop", Component: ShopPage },
      { path: "product/:id", Component: ProductDetailPage },
      { path: "cart", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "order-success/:orderId", Component: OrderSuccessPage },
      { path: "blog", Component: BlogPage },
      { path: "blog/:slug", Component: BlogPostPage },
      { path: "admin/login", Component: AdminLoginPage },
      {
        path: "admin",
        Component: AdminDashboard,
        children: [
          { index: true, Component: AdminProducts },
          { path: "products", Component: AdminProducts },
          { path: "orders", Component: AdminOrders },
        ],
      },
    ],
  },
]);
