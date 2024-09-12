'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Suggestions",
      [
        {
          title: "En salade",
          description: "Les tomates fraîches sont parfaites pour une salade estivale pleine de saveurs. Pour les sublimer, coupez-les en rondelles ou en quartiers, ajoutez un filet d’huile d’olive extra vierge, une pincée de fleur de sel, et quelques feuilles de basilic frais. Pour encore plus de gourmandise, accompagnez votre salade de mozzarella ou de fromage de chèvre frais, et d’un peu de poivre du moulin. Simple, colorée, et rafraîchissante, cette salade est un véritable hommage à l’été et à la générosité des tomates bien mûres.",
          isVisible: true,
          user_id: 1,
          product_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "En sauce",
          description: "Les tomates sont l’ingrédient clé d'une sauce savoureuse et réconfortante. Pour une sauce tomate maison, commencez par faire revenir doucement de l'ail et de l'oignon émincés dans un filet d'huile d'olive. Ajoutez ensuite vos tomates fraîches pelées et coupées en dés, et laissez mijoter à feu doux. Assaisonnez avec du sel, du poivre, et des herbes aromatiques comme le basilic ou l'origan. Laissez cuire jusqu'à ce que les tomates soient bien fondantes et que la sauce ait épaissi. Cette sauce parfumée est parfaite pour accompagner des pâtes, des légumes farcis ou des plats mijotés.",
          isVisible: true,
          user_id: 2,
          product_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Farcie",
          description: "Les tomates farcies sont un grand classique, simple et délicieux. Choisissez de belles tomates bien mûres et rondes, évidez-les délicatement, puis garnissez-les d’un mélange de viande hachée (bœuf, porc ou volaille), d'herbes aromatiques comme le persil et le thym, et d'oignons finement coupés. Assaisonnez à votre goût, puis enfournez vos tomates farcies pendant environ 30 minutes à 180°C. Pour une version végétarienne, remplacez la viande par un mélange de riz, légumes, et fromage. Ce plat généreux et réconfortant est idéal pour un repas en famille ou entre amis.",
          isVisible: true,
          user_id: 1,
          product_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },           
        {
          title: "En salade",
          description: "Dégustez-les en salade de fruits pour un boost de vitamines.",
          isVisible: true,
          user_id: 1,
          product_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },           
        {
          title: "Poêlée",
          description: "Poêlez-les avec de l'huile d'olive et des herbes pour un accompagnement léger et savoureux.",
          isVisible: true,
          user_id: 2,
          product_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },           
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Suggestions", null, {});
  }
};
