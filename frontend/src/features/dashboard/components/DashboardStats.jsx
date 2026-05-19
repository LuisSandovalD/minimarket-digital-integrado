import RevenueCard
from "./RevenueCard";

export default function DashboardStats() {

  return (

    <div
      className="
        grid
        grid-cols-1
        gap-4

        md:grid-cols-2
        xl:grid-cols-4
      "
    >

      <RevenueCard
        title="Ventas"
        value="S/ 12,500"
      />

      <RevenueCard
        title="Productos"
        value="250"
      />

      <RevenueCard
        title="Clientes"
        value="1,240"
      />

      <RevenueCard
        title="Pedidos"
        value="320"
      />

    </div>

  );

}