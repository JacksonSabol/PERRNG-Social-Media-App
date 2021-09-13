module.exports = (sequelize, DataTypes) => {
    /**
     * The variable name Like will get attached to the db object for querying the database
     * while the table name 'Like' defined in single quotes is what appears in the database
     */
    const Like = sequelize.define('Like', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.UUIDV4,
        },
        username: {
            type: DataTypes.STRING(200),
            allowNull: true,
            onDelete: 'CASCADE',
            references: {
                model: 'User',
                key: 'username',
            },
        },
    }, {
        freezeTableName: true,
    });
    Like.associate = (models) => {
        Like.belongsTo(models.Post);
    };
    return Like;
};
