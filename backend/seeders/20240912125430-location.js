'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Locations",
      [
        {
          name: "Place Molière, Angers",
          frequency: "Tous les samedis",
          schedule: "7h00 - 13h00",
          photo: "https://images.unsplash.com/photo-1614020124467-cd66081a993d?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          isVisible: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Le Petit Champ Loin, Doué-en-Anjou",
          frequency: "Tous les mardis",
          schedule: "16h00 - 19h00",
          photo: "https://conso-locale.com/wp-content/uploads/bio-st-georges-768x541.jpg",
          isVisible: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },        
        {
          name: "Parc du Jau, Mûrs-Érigné",
          frequency: "Tous les vendredis",
          schedule: "17h00 - 19h00",
          photo: "https://images.unsplash.com/photo-1705251464625-e2b252d1c0dc?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          isVisible: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },        
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Locations", null, {});
  }
};
