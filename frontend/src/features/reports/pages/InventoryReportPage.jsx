// ========================================
// features/analytics/pages/InventoryReportPage.jsx
// ========================================

import InventoryTable from "../../inventory/components/InventoryTable";

import { SkeletonTable } from "@/components/skeletons";

import { useEffect, useState } from "react";
import { getCompany } from "../../auth/services/session.service";
import { getInventoryReport } from "../services/report.service";

export default function InventoryReportPage({ filters }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        if (filters && filters.startDate && filters.endDate) {
          const company = getCompany();
          const data = await getInventoryReport(
            company?.id,
            filters.startDate,
            filters.endDate,
          );
          setItems(data || []);
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
      <InventoryTable inventories={items} readOnly />
    </div>
  );
}
