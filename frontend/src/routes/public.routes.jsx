import Contact from "../features/public/contact/Contact";
import Features from "../features/public/features/Features";
import Home from "../features/public/home/Home";
import Inventory from "../features/public/inventory/Inventory";
import Modules from "../features/public/modules/Modules";
import Pricing from "../features/public/pricing/Pricing";
import PublicLayout from "../layout/public/PublicLayout";

export const publicRoutes = {
  element: <PublicLayout />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/features", element: <Features /> },
    { path: "/inventory", element: <Inventory /> },
    { path: "/pricing", element: <Pricing /> },
    { path: "/modules", element: <Modules /> },
    { path: "/contact", element: <Contact /> },
  ],
};
