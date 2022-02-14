/*
  Warnings:

  - You are about to drop the column `books` on the `libraries` table. All the data in the column will be lost.
  - Added the required column `libraryId` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_libraries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "qtdBooks" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitue" REAL NOT NULL,
    "cellphone" TEXT NOT NULL
);
INSERT INTO "new_libraries" ("cellphone", "id", "latitude", "longitue", "name") SELECT "cellphone", "id", "latitude", "longitue", "name" FROM "libraries";
DROP TABLE "libraries";
ALTER TABLE "new_libraries" RENAME TO "libraries";
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qtdPages" INTEGER NOT NULL,
    "ISBN" INTEGER NOT NULL,
    "libraryId" TEXT NOT NULL,
    CONSTRAINT "books_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "libraries" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_books" ("ISBN", "author", "createdAt", "id", "name", "qtdPages") SELECT "ISBN", "author", "createdAt", "id", "name", "qtdPages" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
