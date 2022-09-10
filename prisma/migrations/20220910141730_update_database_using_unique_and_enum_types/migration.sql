/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `Credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `SafeNotes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `Wifis` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `name` to the `Wifis` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "cardTypes" AS ENUM ('credit', 'debit', 'both');

-- AlterTable
ALTER TABLE "Cards" ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "cardTypes" NOT NULL;

-- AlterTable
ALTER TABLE "Wifis" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cards_userId_name_key" ON "Cards"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_userId_name_key" ON "Credentials"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "SafeNotes_userId_name_key" ON "SafeNotes"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Wifis_userId_name_key" ON "Wifis"("userId", "name");
