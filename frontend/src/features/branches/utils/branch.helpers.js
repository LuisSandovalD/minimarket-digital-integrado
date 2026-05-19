// ========================================
// utils/branch.helpers.js
// ========================================

export function formatBranchAddress(
  branch
) {

  return `
    ${branch.address},
    ${branch.city},
    ${branch.state}
  `;

}