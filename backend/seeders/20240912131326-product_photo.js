"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "product_photos",
      [
        {
          name: "https://images.unsplash.com/photo-1443131612988-32b6d97cc5da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          product_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "https://images.unsplash.com/photo-1467020323552-36f7bf0e30e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          product_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "https://images.unsplash.com/photo-1663262432134-93bb1e7a60ed?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          product_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "https://images.unsplash.com/photo-1513563401345-1123a773541c?q=80&w=2100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          product_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "https://images.unsplash.com/photo-1445282768818-728615cc910a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          product_id: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("product_photos", null, {});
  },
};
