/*
  Warnings:

  - The primary key for the `workstations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `workstations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[slug]` on the table `sectors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `sectors` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sectors_name_key";

-- AlterTable
ALTER TABLE "sectors" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "workstations" DROP CONSTRAINT "workstations_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "workstations_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "sectors_slug_key" ON "sectors"("slug");
