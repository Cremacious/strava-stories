-- CreateEnum
CREATE TYPE "GoalPeriod" AS ENUM ('THIRTY_DAYS', 'SIXTY_DAYS', 'NINETY_DAYS', 'SIX_MONTHS', 'TWELVE_MONTHS');

-- CreateEnum
CREATE TYPE "GoalType" AS ENUM ('TOTAL_WORKOUTS', 'TOTAL_DURATION', 'TOTAL_DISTANCE', 'TOTAL_CALORIES', 'SPECIFIC_TYPE_WORKOUTS', 'AVERAGE_DISTANCE', 'AVERAGE_DURATION', 'WORKOUTS_PER_WEEK');

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "period" "GoalPeriod" NOT NULL,
    "type" "GoalType" NOT NULL,
    "targetValue" DOUBLE PRECISION NOT NULL,
    "specificType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Goal_userId_idx" ON "Goal"("userId");

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
