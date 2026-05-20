export function buildCategoryTree(categories) {
  const map = {};

  const roots = [];

  categories.forEach((category) => {
    map[category.id] = {
      ...category,
      children: [],
    };
  });

  categories.forEach((category) => {
    if (category.parentId) {
      map[category.parentId]?.children.push(map[category.id]);
    } else {
      roots.push(map[category.id]);
    }
  });

  return roots;
}
