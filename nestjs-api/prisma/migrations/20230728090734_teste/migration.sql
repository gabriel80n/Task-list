/*
  Warnings:

  - A unique constraint covering the columns `[createdIn]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_createdIn_key" ON "Project"("createdIn");
