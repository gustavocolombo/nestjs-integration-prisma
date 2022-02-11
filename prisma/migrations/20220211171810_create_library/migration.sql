-- CreateTable
CREATE TABLE "libraries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "books" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitue" REAL NOT NULL,
    "cellphone" TEXT NOT NULL
);
