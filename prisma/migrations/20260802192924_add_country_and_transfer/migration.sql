/*
  Warnings:

  - Added the required column `countryId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Les équipes existantes sont rattachées à un pays "Inconnu" créé automatiquement.

*/
-- CreateTable
CREATE TABLE `Country` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Pays par défaut pour les équipes déjà existantes
INSERT INTO `Country` (`nom`) VALUES ('Inconnu');

-- AlterTable
ALTER TABLE `team` ADD COLUMN `countryId` INTEGER NOT NULL DEFAULT 1;
ALTER TABLE `team` ALTER COLUMN `countryId` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Transfer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerId` INTEGER NOT NULL,
    `fromTeamId` INTEGER NOT NULL,
    `toTeamId` INTEGER NOT NULL,
    `montant` DOUBLE NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transfer` ADD CONSTRAINT `Transfer_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transfer` ADD CONSTRAINT `Transfer_fromTeamId_fkey` FOREIGN KEY (`fromTeamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transfer` ADD CONSTRAINT `Transfer_toTeamId_fkey` FOREIGN KEY (`toTeamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
