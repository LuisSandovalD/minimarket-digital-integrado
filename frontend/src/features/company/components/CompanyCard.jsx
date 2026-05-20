import CompanyHeaderInfo from "./CompanyHeaderInfo";

import CompanyStatus from "./CompanyStatus";

import CompanyInfoGrid from "./CompanyInfoGrid";

export default function CompanyCard({ company, onEdit }) {
  return (
    <section className="mt-4">
      <CompanyHeaderInfo company={company} onEdit={onEdit} />

      <CompanyStatus company={company} />

      <CompanyInfoGrid company={company} />
    </section>
  );
}
