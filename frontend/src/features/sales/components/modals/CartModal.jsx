// ========================================
// features/sales/components/modals/CartModal.jsx
// ========================================

import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";
import { Layers, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

export default function CartModal({
  open,
  onClose,
  details = [],
  products = [],
  totalAmount = 0,
  totalUnits = 0,
  updateQty,
  removeItem,
  fmt,
}) {
  return (
    <Modal open={open} onClose={onClose} size="lg">
      {/* HEADER */}
      <HeaderModal
        icon={ShoppingCart}
        title="Carrito de Compras"
        subtitle={`${totalUnits} unidades seleccionadas`}
        onClose={onClose}
      />

      {/* CONTENT */}
      <div className="min-h-[450px] max-h-[60vh] overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-950/20">
        {details.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <div className="h-16 w-16 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800">
              <ShoppingCart
                size={26}
                className="text-blue-500 dark:text-blue-400"
              />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-200">
              El carrito está vacío
            </h3>
            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500 max-w-xs mx-auto">
              Selecciona productos del catálogo para agregarlos aquí.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {details.map((item) => {
              // El precio unitario de origen viene neto (Valor Venta)
              const itemPriceNet = Number(item.unitPrice ?? item.price ?? 0);

              // ── MATEMÁTICA INTEGRAL POR FILA: VALOR CON IGV ADICIONADO ──
              const itemPriceWithTax = itemPriceNet * 1.18;
              const itemSubtotalWithTax = Number(
                item.quantity * itemPriceWithTax,
              );

              // Buscamos el nombre en el catálogo local en caso de purga reactiva
              const catalogoMatch = products.find(
                (p) => Number(p.id) === Number(item.productId),
              );
              const nombreAMostrar =
                item.productName ||
                item.name ||
                catalogoMatch?.name ||
                "Producto seleccionado";
              const stockMaximo =
                item.stock ||
                catalogoMatch?.totalStock ||
                catalogoMatch?.stock ||
                999;

              return (
                <div
                  key={item.productId}
                  className="group relative flex items-center gap-4 rounded-2xl border border-slate-200/70 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-4 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200  "
                >
                  {/* DETALLES DEL PRODUCTO */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {nombreAMostrar}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
                        {fmt(itemPriceWithTax)} c/u
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700/50">
                        <Layers size={10} />
                        Stock: {stockMaximo}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal lowercase">
                        (inc. igv)
                      </span>
                    </div>
                  </div>

                  {/* CONTROLES DE CANTIDAD REUTILIZADOS EN CÁPSULA */}
                  <div className="flex items-center gap-1 p-1">
                    <ModernButton
                      type="button"
                      text=""
                      variant="ghost"
                      icon={Minus}
                      onClick={() => updateQty(item.productId, -1)}
                      disabled={item.quantity <= 1}
                    />

                    <span className="min-w-[32px] text-center font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
                      {item.quantity}
                    </span>

                    <ModernButton
                      type="button"
                      text=""
                      variant="ghost"
                      icon={Plus}
                      onClick={() => updateQty(item.productId, 1)}
                      disabled={item.quantity >= stockMaximo}
                    />
                  </div>

                  {/* SUBTOTAL POR LÍNEA CON IMPUESTO INCLUIDO */}
                  <div className="w-28 text-right font-mono text-base font-bold text-slate-800 dark:text-slate-200">
                    {fmt(itemSubtotalWithTax)}
                  </div>

                  {/* BOTÓN ELIMINAR REUTILIZADO */}
                  <ModernButton
                    type="button"
                    text=""
                    variant="danger"
                    icon={Trash2}
                    onClick={() => removeItem(item.productId)}
                    title="Eliminar del carrito"
                    className="shrink-0"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER GENERAL */}
      <FooterModal>
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Total a liquidar (con IGV)
            </p>
            <p className="font-mono text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
              {fmt(totalAmount)}
            </p>
          </div>
          <ModernButton
            text="Confirmar y Cerrar"
            variant="primary"
            onClick={onClose}
          />
        </div>
      </FooterModal>
    </Modal>
  );
}
