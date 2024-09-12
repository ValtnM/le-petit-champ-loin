'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Articles",
      [
        {
          title: "La Ferme du Petit Champ Loin au Marché de Saint-Jean-de-Linières !",
          content: "Nous sommes heureux de vous annoncer notre présence sur un nouveau marché ! À partir de ce samedi, retrouvez-nous chaque semaine au marché de Saint-Jean-de-Linières. Venez découvrir nos légumes bio fraîchement récoltés, nos fruits de saison et nos herbes aromatiques. Nous serons ravis de vous y accueillir et de répondre à toutes vos questions sur nos méthodes de culture et nos engagements.",
          photo: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          isVisible: true,
          user_id: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Pourquoi le Bio ? Les Raisons d’un Engagement Durable",
          content: "L'agriculture biologique, ce n'est pas seulement un label, c'est un mode de vie. Dans un contexte où les questions environnementales sont au cœur des préoccupations, l'agriculture bio représente une réponse concrète aux défis de notre époque. À la Ferme du Petit Champ Loin, nous avons fait le choix de cultiver sans pesticides ni produits chimiques, pour protéger la santé de nos sols, de nos plantes, et de nos consommateurs. Cet engagement pour le bio, c’est aussi une manière de soutenir la biodiversité et de favoriser une agriculture respectueuse des équilibres naturels.",
          photo: null,
          isVisible: true,
          user_id: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Portes Ouvertes Exceptionnelles à la Ferme du Petit Champ Loin",
          content: "Venez découvrir les coulisses de notre ferme bio ! Le dimanche 15 septembre, nous vous invitons à une journée portes ouvertes à la Ferme du Petit Champ Loin. Au programme : visites guidées de nos champs et serres, ateliers pédagogiques pour les enfants, dégustation de nos produits frais, et échanges avec notre équipe sur l'agriculture biologique. C'est l'occasion idéale de passer un moment convivial en famille tout en apprenant plus sur nos pratiques.",
          photo: "https://images.unsplash.com/photo-1485637701894-09ad422f6de6?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          isVisible: true,
          user_id: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },        
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articles', null, {});
  }
};
