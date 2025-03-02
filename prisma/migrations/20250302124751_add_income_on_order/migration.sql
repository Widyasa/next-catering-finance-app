/*
  Warnings:

  - Added the required column `total_income` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "total_income" INTEGER NOT NULL;
