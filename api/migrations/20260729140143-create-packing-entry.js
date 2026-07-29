'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('packing_entries', {
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
      packets_count: { 
        type: Sequelize.INTEGER
      },
      bottles_per_packet: { 
        type: Sequelize.INTEGER
      },
      total_packed_qty: { 
        type: Sequelize.INTEGER
      },
      packed_time: {
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
    await queryInterface.dropTable('packing_entries');
  }
};