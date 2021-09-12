module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            'Post',
            {
                id: {
                    type: Sequelize.UUID,
                    primaryKey: true,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV4,
                },
                username: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                    references: {
                        model: 'User',
                        key: 'username',
                    },
                },
                body: {
                    type: Sequelize.STRING(500),
                    allowNull: true,
                },
                createdAt: {
                    type: Sequelize.DataTypes.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                updatedAt: {
                    type: Sequelize.DataTypes.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                UserId: {
                    type: Sequelize.INTEGER,
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                    allowNull: true,
                    references: {
                        model: 'User',
                        key: 'id',
                    },
                },
            }, {
                freezeTableName: true,
            },
        );
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('Post');
    },
};
