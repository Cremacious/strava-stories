-- CreateTable
CREATE TABLE "StravaWorkout" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "resourceState" INTEGER NOT NULL DEFAULT 2,
    "athleteId" INTEGER,
    "athleteResourceState" INTEGER,
    "name" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "movingTime" INTEGER NOT NULL DEFAULT 0,
    "elapsedTime" INTEGER NOT NULL DEFAULT 0,
    "totalElevationGain" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL,
    "sportType" TEXT NOT NULL,
    "workoutType" INTEGER,
    "startDate" TIMESTAMP(3) NOT NULL,
    "startDateLocal" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT '',
    "utcOffset" INTEGER NOT NULL DEFAULT 0,
    "locationCity" TEXT,
    "locationState" TEXT,
    "locationCountry" TEXT,
    "achievementCount" INTEGER NOT NULL DEFAULT 0,
    "kudosCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "athleteCount" INTEGER NOT NULL DEFAULT 1,
    "photoCount" INTEGER NOT NULL DEFAULT 0,
    "mapId" TEXT,
    "summaryPolyline" TEXT,
    "mapResourceState" INTEGER,
    "trainer" BOOLEAN NOT NULL DEFAULT false,
    "commute" BOOLEAN NOT NULL DEFAULT false,
    "manual" BOOLEAN NOT NULL DEFAULT false,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "visibility" TEXT,
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "gearId" TEXT,
    "startLat" DOUBLE PRECISION,
    "startLng" DOUBLE PRECISION,
    "endLat" DOUBLE PRECISION,
    "endLng" DOUBLE PRECISION,
    "averageSpeed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "maxSpeed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hasHeartrate" BOOLEAN NOT NULL DEFAULT false,
    "averageHeartrate" INTEGER,
    "maxHeartrate" INTEGER,
    "heartrateOptOut" BOOLEAN NOT NULL DEFAULT false,
    "displayHideHeartrateOption" BOOLEAN NOT NULL DEFAULT false,
    "elevHigh" DOUBLE PRECISION,
    "elevLow" DOUBLE PRECISION,
    "uploadId" INTEGER,
    "uploadIdStr" TEXT NOT NULL DEFAULT '',
    "externalId" TEXT NOT NULL DEFAULT '',
    "fromAcceptedTag" BOOLEAN NOT NULL DEFAULT false,
    "prCount" INTEGER NOT NULL DEFAULT 0,
    "totalPhotoCount" INTEGER NOT NULL DEFAULT 0,
    "hasKudoed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StravaWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StravaWorkout_userId_idx" ON "StravaWorkout"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StravaWorkout_id_userId_key" ON "StravaWorkout"("id", "userId");

-- AddForeignKey
ALTER TABLE "StravaWorkout" ADD CONSTRAINT "StravaWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
