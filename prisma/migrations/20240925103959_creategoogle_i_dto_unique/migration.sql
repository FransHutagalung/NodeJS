/*
  Warnings:

  - A unique constraint covering the columns `[googleID]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Users_googleID_key" ON "Users"("googleID");
