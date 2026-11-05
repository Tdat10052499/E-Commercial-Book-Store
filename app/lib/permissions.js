// CR-06 / US-24 permission matrix, kept free of Next.js imports so node --test can check it.
// src/lib/current-user.js uses it for the server-side guards (requireAdmin / requireCatalogEditor).
const CATALOG_EDITORS = ['admin', 'staff']; // add and edit books, categories, authors (US-05, US-06, US-08, US-09, US-24/AC-01, AC-05)
const ADMIN_ONLY = ['admin'];                // hide books, remove categories/authors, accounts (US-07, US-24/AC-02, AC-03, AC-05)

const PERMISSIONS = {
  editCatalog: CATALOG_EDITORS,
  hideBook: ADMIN_ONLY,
  removeCategoryOrAuthor: ADMIN_ONLY,
  manageAccounts: ADMIN_ONLY,
};

const can = (role, action) => (PERMISSIONS[action] || []).includes(role);
const isCatalogEditor = (user) => !!user && can(user.role, 'editCatalog');

module.exports = { CATALOG_EDITORS, PERMISSIONS, can, isCatalogEditor };
