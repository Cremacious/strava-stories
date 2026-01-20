-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('PENDING', 'ACTIVE');

-- AlterTable
ALTER TABLE "CircleMember" ADD COLUMN     "status" "MembershipStatus" NOT NULL DEFAULT 'ACTIVE';
