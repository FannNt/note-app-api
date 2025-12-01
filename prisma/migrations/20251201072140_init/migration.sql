-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_name_key" ON "Note"("name");
