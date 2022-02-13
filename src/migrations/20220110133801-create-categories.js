'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Categories = queryInterface.createTable('Categories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    });

    return Categories;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Categories'),
};
