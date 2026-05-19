export default function UnitStatusBadge({
  active
}) {

  return (
    <span>
      {active ? "Activo" : "Inactivo"}
    </span>
  );

}