export const findParentCategory = (categories, parentId) => {
  return categories.find((category) => category.id === parentId);
};
