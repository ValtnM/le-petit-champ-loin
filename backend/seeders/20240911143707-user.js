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
        {
          name: "Claire",
          email: "claire@lepetitchamploin.fr",
          password: "$2y$10$GY/dEPeA0MlIHB96HvvsCeogciYO7SX7ZBIuK0rBM2A/iz1mAeFnq",
          photo: "https://images.unsplash.com/photo-1669844444850-5acd7e8c71c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydHJhaXQlMjBmZW1tZXxlbnwwfHwwfHx8MA%3D%3D",
          presentation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          isAdmin: false,
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
