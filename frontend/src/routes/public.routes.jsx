import Automations from "../features/public/automations/Automations";
import Contact from "../features/public/contact/Contact";
import Features from "../features/public/features/Features";
import Home from "../features/public/home/Home";
import Pricing from "../features/public/pricing/Pricing";
import Solutions from "../features/public/solutions/Solutions";
import PublicLayout from "../layout/public/PublicLayout";

export const publicRoutes = {
  element: <PublicLayout />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/features", element: <Features /> },
    { path: "/solutions", element: <Solutions /> },
    { path: "/automations", element: <Automations /> },
    { path: "/pricing", element: <Pricing /> },
    { path: "/contact", element: <Contact /> },
  ],
};
