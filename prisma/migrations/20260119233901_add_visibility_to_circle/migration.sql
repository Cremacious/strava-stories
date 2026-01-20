-- AlterTable
ALTER TABLE "Circle" ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE';

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "content" DROP NOT NULL;
