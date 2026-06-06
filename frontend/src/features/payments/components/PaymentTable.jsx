import PaymentActions from "./PaymentActions";
import PaymentStatusBadge from "./PaymentStatusBadge";

const money = (value) =>
  new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(value));

export default function PaymentTable({ payments, onView }) {
  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Venta</th>
            <th className="p-3 text-left">Método</th>
            <th className="p-3 text-left">Monto</th>
            <th className="p-3 text-left">Estado</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-t">
              <td className="p-3">{payment.id}</td>

              <td className="p-3">{payment.sale?.saleNumber || "-"}</td>

              <td className="p-3">{payment.method?.name}</td>

              <td className="p-3">{money(payment.amount)}</td>

              <td className="p-3">
                <PaymentStatusBadge status={payment.status} />
              </td>

              <td className="p-3 text-center">
                <PaymentActions payment={payment} onView={onView} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
