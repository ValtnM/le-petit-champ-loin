'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Tomates",
          type: "légume",
          description: "Nos tomates Cœur de Bœuf, cultivées en serre avec soin, offrent une saveur douce et une chair généreuse. Issues d'une agriculture durable, elles sont parfaites pour agrémenter salades et plats cuisinés tout au long de l'année.",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Courgette",
          type: "légume",
          description: "Nos courgettes, cultivées en serre, sont récoltées à maturité pour offrir une texture tendre et un goût délicat. Parfaites pour les poêlées, gratins ou à déguster crues en salade.",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kiwi",
          type: "fruit",
          description: "Nos kiwis, riches en vitamine C, sont issus de cultures en serre respectueuses de l’environnement. Leur chair juteuse et acidulée est idéale pour une collation saine ou pour agrémenter vos desserts.",
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Banane",
          type: "fruit",
          description: "Nos bananes, cultivées avec soin dans des conditions tropicales contrôlées, sont pleines de saveur et d'énergie. Leur chair sucrée et fondante en fait un fruit idéal pour des snacks ou des smoothies.",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Carotte",
          type: "légume",
          description: "Nos carottes croquantes, cultivées en serre, sont riches en vitamines et en fibres. Elles sont parfaites crues, râpées en salade ou cuites pour accompagner vos plats cuisinés.",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
