import CompanyHeaderInfo from "./CompanyHeaderInfo";
import CompanyInfoGrid from "./CompanyInfoGrid";
import CompanyStatus from "./CompanyStatus";

export default function CompanyCard({ company, onEdit }) {
  return (
    <section className="mt-4 w-full">
      <CompanyHeaderInfo company={company} onEdit={onEdit} />
      <CompanyStatus company={company} />
      <CompanyInfoGrid company={company} />
    </section>
  );
}
