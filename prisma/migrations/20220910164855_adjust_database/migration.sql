/*
  Warnings:

  - You are about to drop the column `name` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Credentials` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SafeNotes` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Wifis` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,title]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `Credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `SafeNotes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `Wifis` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `SafeNotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Wifis` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cards_userId_name_key";

-- DropIndex
DROP INDEX "Credentials_userId_name_key";

-- DropIndex
DROP INDEX "SafeNotes_userId_name_key";

-- DropIndex
DROP INDEX "Wifis_userId_name_key";

-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Credentials" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "SafeNotes" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Wifis" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cards_userId_title_key" ON "Cards"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_userId_title_key" ON "Credentials"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "SafeNotes_userId_title_key" ON "SafeNotes"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Wifis_userId_title_key" ON "Wifis"("userId", "title");
