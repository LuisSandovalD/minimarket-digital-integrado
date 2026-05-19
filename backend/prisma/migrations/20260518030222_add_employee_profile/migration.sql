-- CreateTable
CREATE TABLE "EmployeeProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "shift" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeProfile_userId_key" ON "EmployeeProfile"("userId");

-- CreateIndex
CREATE INDEX "EmployeeProfile_userId_idx" ON "EmployeeProfile"("userId");

-- AddForeignKey
ALTER TABLE "EmployeeProfile" ADD CONSTRAINT "EmployeeProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
