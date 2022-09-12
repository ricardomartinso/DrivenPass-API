/*
  Warnings:

  - You are about to alter the column `number` on the `Cards` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(16)`.
  - You are about to alter the column `cvc` on the `Cards` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(3)`.

*/
-- AlterTable
ALTER TABLE "Cards" ALTER COLUMN "number" SET DATA TYPE VARCHAR(16),
ALTER COLUMN "cvc" SET DATA TYPE VARCHAR(3),
ALTER COLUMN "expirationDate" SET DATA TYPE TEXT;
