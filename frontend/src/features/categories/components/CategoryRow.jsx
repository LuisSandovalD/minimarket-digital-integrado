import FormatDate from "@/components/ui/FormatDate";

import CategoryActions from "./CategoryActions";

export default function CategoryRow({ category }) {
  return (
    <tr
      className="
        border-b
        border-white/[0.05]
        hover:bg-white/[0.03]
      "
    >
      <td className="px-6 py-5">{category.name}</td>

      <td className="px-6 py-5">{category.description || "-"}</td>

      <td className="px-6 py-5">{category.parent?.name || "-"}</td>

      <td className="px-6 py-5">
        <FormatDate date={category.createdAt} />
      </td>

      <td className="px-6 py-5">
        <CategoryActions />
      </td>
    </tr>
  );
}
