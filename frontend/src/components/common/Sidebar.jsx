import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/users", label: "Users" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/branches", label: "Branches" },
  { to: "/units", label: "Units" },
  { to: "/inventory", label: "Inventory" },
  { to: "/inventory-history", label: "Inventory History" },
  { to: "/sales", label: "Sales" },
  { to: "/purchases", label: "Purchases" },
  { to: "/payments", label: "Payments" },
  { to: "/payment-methods", label: "Payment Methods" },
  { to: "/notifications", label: "Notifications" },
  { to: "/support", label: "Support" },
  { to: "/audit", label: "Audit" },
  { to: "/config", label: "Config" },
  { to: "/company", label: "Company" },
  { to: "/reports", label: "Reports" },
  { to: "/analytics", label: "Analytics" },
  { to: "/search", label: "Search" },
  { to: "/stats", label: "Stats" },
  { to: "/activity", label: "Activity" },
  { to: "/system", label: "System" },
  { to: "/upload", label: "Upload" },
  { to: "/security", label: "Security" },
  { to: "/backup", label: "Backup" },
  { to: "/settings", label: "Settings" },
  { to: "/profile", label: "Profile" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
