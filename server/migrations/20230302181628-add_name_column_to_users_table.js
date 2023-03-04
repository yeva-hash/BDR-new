'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('devices', 'description');

    await queryInterface.addColumn('devices', 'description', {
      type: Sequelize.STRING(2048),
      allowNull: false,
      defaultValue: ""
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('devices', 'description', {
      type: Sequelize.STRING(2048),
      allowNull: true,
      defaultValue: ""
    });
  }
};
