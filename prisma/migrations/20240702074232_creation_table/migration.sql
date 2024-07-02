-- CreateTable
CREATE TABLE `Partenaire` (
    `partenaire_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`partenaire_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produit` (
    `produit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `contenance` INTEGER NOT NULL,
    `unite` VARCHAR(191) NOT NULL,
    `partenaire_id` INTEGER NOT NULL,

    PRIMARY KEY (`produit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Utilisateur` (
    `utilisateur_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `type` ENUM('barman', 'livreur') NOT NULL,

    PRIMARY KEY (`utilisateur_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bar` (
    `bar_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`bar_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stock` (
    `bar_id` INTEGER NOT NULL,
    `produit_id` INTEGER NOT NULL,
    `quantite` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`bar_id`, `produit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Livraison` (
    `livraison_id` INTEGER NOT NULL AUTO_INCREMENT,
    `utilisateur_id` INTEGER NOT NULL,
    `bar_id` INTEGER NOT NULL,
    `statut` ENUM('prise_en_charge', 'livre', 'refusee', 'en_attente_de_reponse') NOT NULL DEFAULT 'en_attente_de_reponse',
    `date_livraison` DATETIME(3) NOT NULL,

    PRIMARY KEY (`livraison_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LivraisonProduit` (
    `livraison_produit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `livraison_id` INTEGER NOT NULL,
    `produit_id` INTEGER NOT NULL,
    `quantite` INTEGER NOT NULL,

    PRIMARY KEY (`livraison_produit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Produit` ADD CONSTRAINT `Produit_partenaire_id_fkey` FOREIGN KEY (`partenaire_id`) REFERENCES `Partenaire`(`partenaire_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_bar_id_fkey` FOREIGN KEY (`bar_id`) REFERENCES `Bar`(`bar_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_produit_id_fkey` FOREIGN KEY (`produit_id`) REFERENCES `Produit`(`produit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Livraison` ADD CONSTRAINT `Livraison_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `Utilisateur`(`utilisateur_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Livraison` ADD CONSTRAINT `Livraison_bar_id_fkey` FOREIGN KEY (`bar_id`) REFERENCES `Bar`(`bar_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LivraisonProduit` ADD CONSTRAINT `LivraisonProduit_livraison_id_fkey` FOREIGN KEY (`livraison_id`) REFERENCES `Livraison`(`livraison_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LivraisonProduit` ADD CONSTRAINT `LivraisonProduit_produit_id_fkey` FOREIGN KEY (`produit_id`) REFERENCES `Produit`(`produit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
