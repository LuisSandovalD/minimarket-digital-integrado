// ========================================
// constants/saleDetail.columns.js
// ========================================
import {
  DollarSign,
  Package,
  Receipt,
  Settings2,
  ShoppingCart,
} from "lucide-react";

export const saleDetailColumns = [
  { key: "sale", text: "Venta", Icon: Receipt },
  { key: "product", text: "Producto", Icon: Package },
  { key: "quantity", text: "Cantidad", Icon: ShoppingCart },
  { key: "price", text: "Precio U.", Icon: DollarSign },
  { key: "subtotal", text: "Subtotal", Icon: DollarSign },
  { key: "total", text: "Total Venta", Icon: DollarSign },
  { key: "actions", text: "Acciones", Icon: Settings2 },
];
