const variants = {
  COMPLETED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-blue-100 text-blue-700",
};

export default function PaymentStatusBadge({ status }) {
  return (
    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${variants[status] || "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}
