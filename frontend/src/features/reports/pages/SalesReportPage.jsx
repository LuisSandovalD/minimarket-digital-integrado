// ========================================
// features/analytics/pages/SalesReportPage.jsx
// ========================================

import SaleTable from "../../sales/components/SaleTable";

import {
    getDailySalesReport,
    getSales,
} from "../../sales/services/sale.service";

import { SkeletonTable } from "@/components/skeletons";
import { useEffect, useState } from "react";
import { getCompany } from "../../auth/services/session.service";

export default function SalesReportPage({ filters }) {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        if (filters && filters.startDate && filters.endDate) {
          const company = getCompany();
          const data = await getDailySalesReport(
            filters.startDate,
            filters.endDate,
            company?.id,
          );
          setSales(data || []);
        } else {
          // No date range: fall back to full sales list so preview shows data
          const data = await getSales();
          setSales(data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [filters]);

  if (loading) return <SkeletonTable />;

  return (
    <div className="space-y-6">
      <SaleTable sales={sales} readOnly />
    </div>
  );
}
