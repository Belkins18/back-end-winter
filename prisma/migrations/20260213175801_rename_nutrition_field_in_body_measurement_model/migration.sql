/*
  Warnings:

  - You are about to drop the column `nutritionalGoal` on the `body_measurements` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NutritionGoal" AS ENUM ('WEIGHT_LOSS', 'MAINTENANCE', 'MUSCULE_GAIN');

-- AlterTable
ALTER TABLE "body_measurements" DROP COLUMN "nutritionalGoal",
ADD COLUMN     "nutritionGoal" "NutritionGoal";

-- DropEnum
DROP TYPE "NutritionalGoal";
