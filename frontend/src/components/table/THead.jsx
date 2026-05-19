// ============================================
// components/ui/table/THead.jsx
// ============================================

export default function THead({
  columns = [],
}) {

  return (

    <thead>

      <tr
        className="
          border-b
          border-white/10
          bg-white/[0.03]
        "
      >

        {columns.map((column) => (

          <th
            key={column.key}
            className="
              whitespace-nowrap
              px-6
              py-4
              text-left
              text-[11px]
              font-medium
              uppercase
              tracking-[0.14em]
              text-white/45
            "
          >
            {column.label}
          </th>

        ))}

      </tr>

    </thead>

  );

}