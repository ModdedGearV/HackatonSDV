import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    try {
        const rechercheLivraisonsPriseEnCharge = await prisma.livraison.findMany({
            where: {
              statut: 'prise_en_charge',
            },
            include: {
              utilisateur: true,
              bar: true,
              produits: {
                include: {
                  produit: true,
                },
              },
            },
          });
        
          const LivraisonsPriseEnCharge = rechercheLivraisonsPriseEnCharge.map((livraison) => ({
            livraison_id: livraison.livraison_id,
            livreur: livraison.utilisateur.nom,
            bar: livraison.bar.nom,
            statut: livraison.statut,
            date_livraison: livraison.date_livraison,
            produits: livraison.produits
              .map(
                (lp) =>
                  `${lp.produit.nom} (${lp.produit.contenance}${lp.produit.unite}) x${lp.quantite}`
              )
              .join(', '),
          }));
        
          console.log(LivraisonsPriseEnCharge);
        
    } catch (err) {
        console.log(err);
    } finally {
        async () => {
            await prisma.$disconnect();
        }
    }
}

main();