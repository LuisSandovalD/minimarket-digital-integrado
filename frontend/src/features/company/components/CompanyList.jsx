import useCompany from "../hooks/useCompany";

import CompanyCard from "./CompanyCard";

export default function CompanyList({ onEdit }) {
  const { company, loading, error } = useCompany();

  if (loading) {
    return <div className="py-12 text-center">Cargando empresa...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!company) {
    return <div>No se encontró la empresa.</div>;
  }

  return <CompanyCard company={company} onEdit={onEdit} />;
}
