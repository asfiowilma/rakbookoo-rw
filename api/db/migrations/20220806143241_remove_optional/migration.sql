/*
  Warnings:

  - Made the column `shelfId` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bookId` on table `Note` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userUid` on table `Shelf` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_shelfId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Shelf" DROP CONSTRAINT "Shelf_userUid_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "shelfId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "bookId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Shelf" ALTER COLUMN "userUid" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "Shelf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shelf" ADD CONSTRAINT "Shelf_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
