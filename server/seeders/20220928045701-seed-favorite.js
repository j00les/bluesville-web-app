'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Favorites',
      [
        {
          UserId: 3,
          ProductId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserId: 3,
          ProductId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserId: 3,
          ProductId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          UserId: 4,
          ProductId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          UserId: 4,
          ProductId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          UserId: 4,
          ProductId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Favorites', null, {});
  },
};
