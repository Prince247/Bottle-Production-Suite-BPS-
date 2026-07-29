'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('production_run', {
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
      machine_id: { 
        type: Sequelize.UUID
      },
      start_time: { 
        type: Sequelize.DATE
      },
      end_time: { 
        type: Sequelize.DATE
      },
      preform_used_qty: {
        type: Sequelize.INTEGER
      },
      produced_qty: {
        type: Sequelize.INTEGER
      },
      damaged_qty: {
        type: Sequelize.INTEGER
      },
      remarks: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('production_run');
  }
};