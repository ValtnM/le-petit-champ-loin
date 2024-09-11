"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Adminisrateur",
          email: "admin@lepetitchamploin.fr",
          password: "$2y$10$GY/dEPeA0MlIHB96HvvsCeogciYO7SX7ZBIuK0rBM2A/iz1mAeFnq",
          photo: "https://images.unsplash.com/photo-1701503098048-671c0a40d458?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHBvcnRyYWl0JTIwaG9tbWV8ZW58MHx8MHx8fDA%3D",
          presentation: "Lorem Ipsum is simply dummy text",
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Users', null, {});
     
  },
};
