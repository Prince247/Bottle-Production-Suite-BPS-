'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('preform_inward', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v1mc()')
      },
      daily_log_id: {
        type: Sequelize.UUID
      },
      party_id: {
        type: Sequelize.UUID
      },
      box: { 
        type: Sequelize.DECIMAL(16,9)
      },
      qty_per_box: { 
        type: Sequelize.DECIMAL(16,9)
      },
      total_qty: { 
        type: Sequelize.DECIMAL(16,9)
      },
      received_date: {
        type: Sequelize.DATE
      },
      created_by: {
        type: Sequelize.UUID
      },
      updated_by: {
        type: Sequelize.UUID
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('preform_inward');
  }
};