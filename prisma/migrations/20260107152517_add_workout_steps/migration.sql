-- CreateEnum
CREATE TYPE "StepType" AS ENUM ('WARM_UP', 'EXERCISE', 'COOL_DOWN');

-- CreateTable
CREATE TABLE "WorkoutStep" (
    "id" TEXT NOT NULL,
    "routineId" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "type" "StepType" NOT NULL,
    "name" TEXT NOT NULL,
    "sets" INTEGER,
    "reps" INTEGER,
    "duration" INTEGER,
    "rest" INTEGER,
    "instructions" TEXT,
    "equipment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkoutStep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkoutStep_routineId_idx" ON "WorkoutStep"("routineId");

-- CreateIndex
CREATE INDEX "WorkoutStep_stepNumber_idx" ON "WorkoutStep"("stepNumber");

-- AddForeignKey
ALTER TABLE "WorkoutStep" ADD CONSTRAINT "WorkoutStep_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "WorkoutRoutine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
