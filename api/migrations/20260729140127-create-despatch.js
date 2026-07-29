'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('despatch', {
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
      packets_despatched: { 
        type: Sequelize.INTEGER
      },
      bottles_per_packet: { 
        type: Sequelize.INTEGER
      },
      total_qty: { 
        type: Sequelize.INTEGER
      },
      despatch_time: {
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
    await queryInterface.dropTable('despatch');
  }
};