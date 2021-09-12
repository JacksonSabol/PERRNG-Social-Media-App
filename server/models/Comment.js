module.exports = (sequelize, DataTypes) => {
    /**
     * The variable name Comment will get attached to the db object for querying the database
     * while the table name 'Comment' defined in single quotes is what appears in the database
     */
    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.UUIDV4,
        },
        username: {
            type: DataTypes.STRING(200),
            allowNull: true,
            onDelete: 'SET NULL',
            references: {
                model: 'User',
                key: 'username',
            },
        },
        body: {
            type: DataTypes.STRING(500),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 500],
                    msg: 'Comment body must not exceed 500 characters',
                },
            },
        },
    }, {
        freezeTableName: true,
    });
    Comment.associate = (models) => {
        Comment.belongsTo(models.User);
    };
    Comment.associate = (models) => {
        Comment.belongsTo(models.Post);
    };
    return Comment;
};
