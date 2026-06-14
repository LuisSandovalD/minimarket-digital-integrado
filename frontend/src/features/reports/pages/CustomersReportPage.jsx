// ========================================
// features/analytics/pages/CustomersReportPage.jsx
// ========================================

import CustomerTable from "../../customer/components/CustomerTable";

import { SkeletonTable } from "@/components/skeletons";

import { useEffect, useState } from "react";
import { getCompany } from "../../auth/services/session.service";
import { getCustomersReport } from "../services/report.service";

export default function CustomersReportPage({ filters }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        if (filters && filters.startDate && filters.endDate) {
          const company = getCompany();
          const data = await getCustomersReport(
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
      <CustomerTable customers={items} readOnly />
    </div>
  );
}
