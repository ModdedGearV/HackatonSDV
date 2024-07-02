import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    try {
        // Insertion des partenaires
        const partenaireA = await prisma.partenaire.create({
            data: { nom: 'Partenaire A' }
        });
        const partenaireB = await prisma.partenaire.create({
            data: { nom: 'Partenaire B' }
        });

        // Insertion des produits
        const coca500ml = await prisma.produit.create({
            data: { nom: 'Coca-Cola', contenance: 500, unite: 'ml', partenaire_id: partenaireA.partenaire_id }
        });
        const eau1000ml = await prisma.produit.create({
            data: { nom: 'Eau', contenance: 1000, unite: 'ml', partenaire_id: partenaireB.partenaire_id }
        });
        const biere1500ml = await prisma.produit.create({
            data: { nom: 'Bière', contenance: 1500, unite: 'ml', partenaire_id: partenaireA.partenaire_id }
        });
        const vin750ml = await prisma.produit.create({
            data: { nom: 'Vin', contenance: 750, unite: 'ml', partenaire_id: partenaireB.partenaire_id }
        });

        const coca1000ml = await prisma.produit.create({
            data: { nom: 'Coca-Cola', contenance: 1000, unite: 'ml', partenaire_id: partenaireA.partenaire_id }
        });
        const chipsLays50gr = await prisma.produit.create({
            data: { nom: 'Chips Lays', contenance: 50, unite: 'gr', partenaire_id: partenaireB.partenaire_id }
        });

        // Insertion des utilisateurs
        const barmanJohn = await prisma.utilisateur.create({
            data: { nom: 'John Doe', type: 'barman' }
        });
        const livreurJane = await prisma.utilisateur.create({
            data: { nom: 'Jane Smith', type: 'livreur' }
        });

        // Insertion des bars
        const barCentral = await prisma.bar.create({
            data: { nom: 'Bar Central' }
        });
        const barDesAmis = await prisma.bar.create({
            data: { nom: 'Bar des Amis' }
        });

        // Insertion des stocks
        await prisma.stock.createMany({
            data: [
                { bar_id: barCentral.bar_id, produit_id: coca500ml.produit_id, quantite: 40 },
                { bar_id: barCentral.bar_id, produit_id: eau1000ml.produit_id, quantite: 10 },
                { bar_id: barDesAmis.bar_id, produit_id: coca500ml.produit_id, quantite: 20 },
                { bar_id: barDesAmis.bar_id, produit_id: eau1000ml.produit_id, quantite: 15 },
            ]
        });

        // Insertion des livraisons
        const livraison1 = await prisma.livraison.create({
            data: { utilisateur_id: livreurJane.utilisateur_id, bar_id: barCentral.bar_id, statut: 'prise_en_charge', date_livraison: new Date('2024-07-01') }
        });
        const livraison2 = await prisma.livraison.create({
            data: { utilisateur_id: livreurJane.utilisateur_id, bar_id: barDesAmis.bar_id, statut: 'livre', date_livraison: new Date('2024-07-01') }
        });

        // Insertion des produits dans les livraisons
        await prisma.livraisonProduit.createMany({
            data: [
                { livraison_id: livraison1.livraison_id, produit_id: coca500ml.produit_id, quantite: 50 },
                { livraison_id: livraison1.livraison_id, produit_id: eau1000ml.produit_id, quantite: 30 },
                { livraison_id: livraison2.livraison_id, produit_id: coca500ml.produit_id, quantite: 20 },
                { livraison_id: livraison2.livraison_id, produit_id: eau1000ml.produit_id, quantite: 15 },
            ],
        });



        // Mise à jour des stocks pour les nouveaux produits
        await prisma.stock.createMany({
            data: [
                { bar_id: barCentral.bar_id, produit_id: coca1000ml.produit_id, quantite: 30 },
                { bar_id: barCentral.bar_id, produit_id: chipsLays50gr.produit_id, quantite: 50 },
                { bar_id: barDesAmis.bar_id, produit_id: coca1000ml.produit_id, quantite: 20 },
                { bar_id: barDesAmis.bar_id, produit_id: chipsLays50gr.produit_id, quantite: 40 },
            ],
        });

        // Insérer 10 unités de Coca-Cola 1L dans la livraison ID 1
        await prisma.livraisonProduit.create({
            data: { livraison_id: livraison1.livraison_id, produit_id: coca1000ml.produit_id, quantite: 10 }
        });



    } catch (err) {
        console.log(err);
    } finally {
        async () => {
            await prisma.$disconnect();
        }
    }
}

main();