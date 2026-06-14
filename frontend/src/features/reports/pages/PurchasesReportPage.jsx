// ========================================
// features/analytics/pages/PurchasesReportPage.jsx
// ========================================

import PurchasesTable from "../../purchase/components/PurchaseTable";

import { SkeletonTable } from "@/components/skeletons";

import { useEffect, useState } from "react";
import { getCompany } from "../../auth/services/session.service";
import { getDailyPurchasesReport } from "../services/report.service";

export default function PurchasesReportPage({ filters }) {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        if (filters && filters.startDate && filters.endDate) {
          const company = getCompany();
          const data = await getDailyPurchasesReport(
            company?.id,
            filters.startDate,
            filters.endDate,
          );
          setPurchases(data || []);
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
      <PurchasesTable purchases={purchases} readOnly />
    </div>
  );
}
