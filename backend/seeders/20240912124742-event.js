"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Events",
      [
        {
          title: "Marché",
          date: new Date("2024-10-10"),
          schedule: "16h00 - 19h00",
          location: "Le petit champ loin, 49700, Doué-en-Anjou",
          isVisible: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Marché",
          date: new Date("2024-10-14"),
          schedule: "7h00 - 13h00",
          location: "Place Molière, 49100, Angers",
          isVisible: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events", null, {});
  },
};
