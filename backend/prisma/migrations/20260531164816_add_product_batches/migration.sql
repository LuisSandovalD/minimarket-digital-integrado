/*
  Warnings:

  - You are about to drop the column `batchNumber` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `expirationDate` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "batchNumber",
DROP COLUMN "expirationDate",
ADD COLUMN     "trackBatches" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PurchaseDetail" ADD COLUMN     "batchNumber" VARCHAR(100),
ADD COLUMN     "expirationDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SaleDetail" ADD COLUMN     "batchId" INTEGER;

-- CreateTable
CREATE TABLE "ProductBatch" (
    "id" SERIAL NOT NULL,
    "batchNumber" VARCHAR(100) NOT NULL,
    "expirationDate" TIMESTAMP(3),
    "initialQuantity" INTEGER NOT NULL,
    "currentQuantity" INTEGER NOT NULL,
    "purchasePrice" DECIMAL(10,2),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "depletedAt" TIMESTAMP(3),
    "productId" INTEGER NOT NULL,
    "purchaseDetailId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "ProductBatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductBatch_productId_idx" ON "ProductBatch"("productId");

-- CreateIndex
CREATE INDEX "ProductBatch_expirationDate_idx" ON "ProductBatch"("expirationDate");

-- CreateIndex
CREATE INDEX "ProductBatch_productId_expirationDate_idx" ON "ProductBatch"("productId", "expirationDate");

-- CreateIndex
CREATE INDEX "ProductBatch_branchId_idx" ON "ProductBatch"("branchId");

-- CreateIndex
CREATE INDEX "ProductBatch_companyId_idx" ON "ProductBatch"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductBatch_batchNumber_productId_branchId_key" ON "ProductBatch"("batchNumber", "productId", "branchId");

-- CreateIndex
CREATE INDEX "Branch_isDeleted_idx" ON "Branch"("isDeleted");

-- CreateIndex
CREATE INDEX "Branch_city_idx" ON "Branch"("city");

-- CreateIndex
CREATE INDEX "Branch_country_idx" ON "Branch"("country");

-- CreateIndex
CREATE INDEX "Company_name_idx" ON "Company"("name");

-- CreateIndex
CREATE INDEX "Company_slug_idx" ON "Company"("slug");

-- CreateIndex
CREATE INDEX "Inventory_productId_idx" ON "Inventory"("productId");

-- CreateIndex
CREATE INDEX "Product_unitId_idx" ON "Product"("unitId");

-- CreateIndex
CREATE INDEX "Product_isActive_idx" ON "Product"("isActive");

-- CreateIndex
CREATE INDEX "Product_isDeleted_idx" ON "Product"("isDeleted");

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- CreateIndex
CREATE INDEX "Product_barcode_idx" ON "Product"("barcode");

-- CreateIndex
CREATE INDEX "Product_companyId_name_idx" ON "Product"("companyId", "name");

-- CreateIndex
CREATE INDEX "Product_companyId_sku_idx" ON "Product"("companyId", "sku");

-- CreateIndex
CREATE INDEX "PurchaseDetail_expirationDate_idx" ON "PurchaseDetail"("expirationDate");

-- CreateIndex
CREATE INDEX "SaleDetail_batchId_idx" ON "SaleDetail"("batchId");

-- AddForeignKey
ALTER TABLE "SaleDetail" ADD CONSTRAINT "SaleDetail_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "ProductBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBatch" ADD CONSTRAINT "ProductBatch_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBatch" ADD CONSTRAINT "ProductBatch_purchaseDetailId_fkey" FOREIGN KEY ("purchaseDetailId") REFERENCES "PurchaseDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBatch" ADD CONSTRAINT "ProductBatch_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBatch" ADD CONSTRAINT "ProductBatch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
