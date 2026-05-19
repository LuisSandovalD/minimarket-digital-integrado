-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'SUPERVISOR', 'EMPLOYEE', 'VIEWER');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CARD', 'CHECK', 'TRANSFER', 'WALLET');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED', 'PARTIAL');

-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('DRAFT', 'PENDING', 'COMPLETED', 'CANCELLED', 'RETURNED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('DRAFT', 'PENDING', 'RECEIVED', 'COMPLETED', 'CANCELLED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('EXPIRING_PRODUCT', 'LOW_STOCK', 'SYSTEM_ALERT', 'PURCHASE_READY', 'USER_ALERT', 'INVENTORY_MISMATCH', 'PAYMENT_OVERDUE');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'SOFT_DELETE', 'LOGIN', 'LOGOUT', 'EXPORT', 'IMPORT', 'RESTORE');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'WAITING', 'RESOLVED', 'CLOSED', 'REOPENED');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('LITER', 'HALF_LITER', 'QUARTER_LITER', 'MILLILITER', 'GRAM', 'KILOGRAM', 'UNIT', 'BOX', 'PACK', 'DOZEN', 'METER', 'SQUARE_METER');

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "ruc" VARCHAR(20),
    "address" VARCHAR(500),
    "phone" VARCHAR(20),
    "email" VARCHAR(255),
    "logo" TEXT,
    "website" VARCHAR(255),
    "taxId" VARCHAR(50),
    "legalRepresentative" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionTier" VARCHAR(50) NOT NULL DEFAULT 'FREE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(20),
    "logo" TEXT,
    "description" TEXT,
    "address" VARCHAR(500) NOT NULL,
    "phone" VARCHAR(20),
    "email" VARCHAR(255),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "country" VARCHAR(100),
    "postalCode" VARCHAR(20),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EMPLOYEE',
    "phone" VARCHAR(20),
    "avatar" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "lastLogin" TIMESTAMP(3),
    "lastLogout" TIMESTAMP(3),
    "loginAttempts" INTEGER NOT NULL DEFAULT 0,
    "lockedUntil" TIMESTAMP(3),
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorSecret" VARCHAR(255),
    "backupCodes" TEXT,
    "managerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "companyId" INTEGER NOT NULL,
    "branchId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSession" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "ipAddress" VARCHAR(100),
    "userAgent" VARCHAR(500),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "refreshExpiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "abbreviation" VARCHAR(20) NOT NULL,
    "type" "UnitType" NOT NULL,
    "conversionFactor" DECIMAL(10,4) NOT NULL DEFAULT 1,
    "baseUnit" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(500),
    "parentId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "sku" VARCHAR(50),
    "barcode" VARCHAR(50),
    "purchasePrice" DECIMAL(10,2) NOT NULL,
    "salePrice" DECIMAL(10,2) NOT NULL,
    "costPrice" DECIMAL(10,2) NOT NULL,
    "minStock" INTEGER NOT NULL DEFAULT 5,
    "maxStock" INTEGER,
    "expirationDate" TIMESTAMP(3),
    "batchNumber" VARCHAR(100),
    "requiresExpiration" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "companyId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "documentType" VARCHAR(20),
    "documentNumber" VARCHAR(50),
    "email" VARCHAR(255),
    "phone" VARCHAR(20),
    "address" VARCHAR(500),
    "city" VARCHAR(100),
    "notes" TEXT,
    "creditLimit" DECIMAL(10,2),
    "currentDebt" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "ruc" VARCHAR(50),
    "email" VARCHAR(255),
    "phone" VARCHAR(20),
    "address" VARCHAR(500),
    "contactPerson" VARCHAR(255),
    "website" VARCHAR(255),
    "notes" TEXT,
    "currentDebt" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "reservedStock" INTEGER NOT NULL DEFAULT 0,
    "damagedStock" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryHistory" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "previousStock" INTEGER NOT NULL,
    "newStock" INTEGER NOT NULL,
    "reason" VARCHAR(255),
    "reference" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" INTEGER NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "InventoryHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod_DB" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" "PaymentMethod" NOT NULL,
    "accountNumber" VARCHAR(50),
    "accountHolder" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "PaymentMethod_DB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "saleNumber" VARCHAR(50) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "tax" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "status" "SaleStatus" NOT NULL DEFAULT 'COMPLETED',
    "notes" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "customerId" INTEGER,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleDetail" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "tax" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "saleId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "SaleDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "purchaseNumber" VARCHAR(50) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "tax" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'COMPLETED',
    "notes" VARCHAR(500),
    "expectedDelivery" TIMESTAMP(3),
    "actualDelivery" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "buyerId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "supplierId" INTEGER,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseDetail" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "tax" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "purchaseId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "PurchaseDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" INTEGER NOT NULL,
    "reference" VARCHAR(100),
    "notes" VARCHAR(500),
    "transactionId" VARCHAR(100),
    "paidAt" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "saleId" INTEGER,
    "purchaseId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" SERIAL NOT NULL,
    "action" "AuditAction" NOT NULL,
    "entityType" VARCHAR(100) NOT NULL,
    "entityId" INTEGER NOT NULL,
    "description" VARCHAR(500),
    "oldValues" JSONB,
    "newValues" JSONB,
    "ipAddress" VARCHAR(50),
    "userAgent" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "branchId" INTEGER,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportTicket" (
    "id" SERIAL NOT NULL,
    "ticketNumber" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'OPEN',
    "priority" "TicketPriority" NOT NULL DEFAULT 'MEDIUM',
    "attachments" TEXT,
    "resolutionNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "assignedTo" INTEGER,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketComment" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "attachments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TicketComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configuration" (
    "id" SERIAL NOT NULL,
    "companyName" VARCHAR(255),
    "logo" VARCHAR(500),
    "theme" VARCHAR(50) NOT NULL DEFAULT 'light',
    "language" VARCHAR(10) NOT NULL DEFAULT 'es',
    "taxRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "currency" VARCHAR(10) NOT NULL DEFAULT 'PEN',
    "defaultTaxEnabled" BOOLEAN NOT NULL DEFAULT true,
    "notifyLowStock" BOOLEAN NOT NULL DEFAULT true,
    "lowStockThreshold" INTEGER NOT NULL DEFAULT 5,
    "notifyExpiring" BOOLEAN NOT NULL DEFAULT true,
    "expiringDaysAlert" INTEGER NOT NULL DEFAULT 30,
    "requireTwoFactor" BOOLEAN NOT NULL DEFAULT false,
    "sessionTimeout" INTEGER NOT NULL DEFAULT 3600,
    "passwordMinLength" INTEGER NOT NULL DEFAULT 8,
    "passwordExpiresDays" INTEGER,
    "requirePasswordChange" BOOLEAN NOT NULL DEFAULT false,
    "allowMultipleLogins" BOOLEAN NOT NULL DEFAULT true,
    "autoBackup" BOOLEAN NOT NULL DEFAULT true,
    "backupFrequency" VARCHAR(50) NOT NULL DEFAULT 'DAILY',
    "maxLoginAttempts" INTEGER NOT NULL DEFAULT 5,
    "allowExport" BOOLEAN NOT NULL DEFAULT true,
    "allowImport" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Company_ruc_key" ON "Company"("ruc");

-- CreateIndex
CREATE UNIQUE INDEX "Company_taxId_key" ON "Company"("taxId");

-- CreateIndex
CREATE INDEX "Company_isActive_idx" ON "Company"("isActive");

-- CreateIndex
CREATE INDEX "Company_isDeleted_idx" ON "Company"("isDeleted");

-- CreateIndex
CREATE INDEX "Branch_companyId_idx" ON "Branch"("companyId");

-- CreateIndex
CREATE INDEX "Branch_isActive_idx" ON "Branch"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_name_companyId_key" ON "Branch"("name", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_code_companyId_key" ON "Branch"("code", "companyId");

-- CreateIndex
CREATE INDEX "User_companyId_idx" ON "User"("companyId");

-- CreateIndex
CREATE INDEX "User_branchId_idx" ON "User"("branchId");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_companyId_key" ON "User"("email", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSession_token_key" ON "UserSession"("token");

-- CreateIndex
CREATE UNIQUE INDEX "UserSession_refreshToken_key" ON "UserSession"("refreshToken");

-- CreateIndex
CREATE INDEX "UserSession_userId_idx" ON "UserSession"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_abbreviation_companyId_key" ON "Unit"("abbreviation", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_name_companyId_key" ON "Unit"("name", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_companyId_key" ON "Category"("name", "companyId");

-- CreateIndex
CREATE INDEX "Product_companyId_idx" ON "Product"("companyId");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_companyId_key" ON "Product"("sku", "companyId");

-- CreateIndex
CREATE INDEX "Customer_companyId_idx" ON "Customer"("companyId");

-- CreateIndex
CREATE INDEX "Customer_name_idx" ON "Customer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_documentNumber_companyId_key" ON "Customer"("documentNumber", "companyId");

-- CreateIndex
CREATE INDEX "Supplier_companyId_idx" ON "Supplier"("companyId");

-- CreateIndex
CREATE INDEX "Supplier_name_idx" ON "Supplier"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_name_companyId_key" ON "Supplier"("name", "companyId");

-- CreateIndex
CREATE INDEX "Inventory_branchId_idx" ON "Inventory"("branchId");

-- CreateIndex
CREATE INDEX "Inventory_companyId_idx" ON "Inventory"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productId_branchId_key" ON "Inventory"("productId", "branchId");

-- CreateIndex
CREATE INDEX "InventoryHistory_productId_idx" ON "InventoryHistory"("productId");

-- CreateIndex
CREATE INDEX "InventoryHistory_branchId_idx" ON "InventoryHistory"("branchId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_DB_type_companyId_key" ON "PaymentMethod_DB"("type", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_saleNumber_key" ON "Sale"("saleNumber");

-- CreateIndex
CREATE INDEX "Sale_companyId_idx" ON "Sale"("companyId");

-- CreateIndex
CREATE INDEX "Sale_branchId_idx" ON "Sale"("branchId");

-- CreateIndex
CREATE INDEX "Sale_status_idx" ON "Sale"("status");

-- CreateIndex
CREATE INDEX "SaleDetail_saleId_idx" ON "SaleDetail"("saleId");

-- CreateIndex
CREATE INDEX "SaleDetail_productId_idx" ON "SaleDetail"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_purchaseNumber_key" ON "Purchase"("purchaseNumber");

-- CreateIndex
CREATE INDEX "Purchase_companyId_idx" ON "Purchase"("companyId");

-- CreateIndex
CREATE INDEX "Purchase_branchId_idx" ON "Purchase"("branchId");

-- CreateIndex
CREATE INDEX "Purchase_status_idx" ON "Purchase"("status");

-- CreateIndex
CREATE INDEX "PurchaseDetail_purchaseId_idx" ON "PurchaseDetail"("purchaseId");

-- CreateIndex
CREATE INDEX "PurchaseDetail_productId_idx" ON "PurchaseDetail"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "SupportTicket_ticketNumber_key" ON "SupportTicket"("ticketNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_companyId_key" ON "Configuration"("companyId");

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD CONSTRAINT "InventoryHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD CONSTRAINT "InventoryHistory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD CONSTRAINT "InventoryHistory_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD CONSTRAINT "InventoryHistory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod_DB" ADD CONSTRAINT "PaymentMethod_DB_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetail" ADD CONSTRAINT "SaleDetail_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetail" ADD CONSTRAINT "SaleDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_paymentMethod_fkey" FOREIGN KEY ("paymentMethod") REFERENCES "PaymentMethod_DB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportTicket" ADD CONSTRAINT "SupportTicket_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketComment" ADD CONSTRAINT "TicketComment_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "SupportTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketComment" ADD CONSTRAINT "TicketComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
