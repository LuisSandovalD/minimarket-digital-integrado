import DashboardHeader from "@/features/dashboard/components/DashboardHeader";

import DashboardStats from "@/features/dashboard/components/DashboardStats";

import SalesChart from "@/features/dashboard/components/SalesChart";

import LowStockProducts from "@/features/dashboard/components/LowStockProducts";

import RecentSales from "@/features/dashboard/components/RecentSales";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <DashboardStats />

      <div
        className="
          grid
          grid-cols-1
          gap-6

          xl:grid-cols-3
        "
      >
        <div className="xl:col-span-2">
          <SalesChart />
        </div>

        <LowStockProducts />
      </div>

      <RecentSales />
    </div>
  );
}
