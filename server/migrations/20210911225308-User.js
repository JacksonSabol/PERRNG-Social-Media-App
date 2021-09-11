module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            'User',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                username: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING(100),
                    unique: true,
                    isEmail: true,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.CHAR(60),
                    allowNull: false,
                },
                createdAt: {
                    type: Sequelize.DataTypes.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                updatedAt: {
                    type: Sequelize.DataTypes.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
            }, {
                freezeTableName: true,
            },
        );
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('User');
    },
};
