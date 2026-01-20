/*
  Warnings:

  - The primary key for the `StravaWorkout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `StravaWorkout` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "StravaWorkout" DROP CONSTRAINT "StravaWorkout_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGINT NOT NULL,
ALTER COLUMN "athleteId" SET DATA TYPE BIGINT,
ALTER COLUMN "uploadId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "StravaWorkout_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "StravaWorkout_id_userId_key" ON "StravaWorkout"("id", "userId");
