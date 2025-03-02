/*
  Warnings:

  - Added the required column `date` to the `OrderOutcome` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderOutcome" ADD COLUMN     "date" TEXT NOT NULL;
