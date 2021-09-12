module.exports = (sequelize, DataTypes) => {
    /**
     * The variable name Post will get attached to the db object for querying the database
     * while the table name 'Post' defined in single quotes is what appears in the database
     */
    const Post = sequelize.define('Post', {
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
                    msg: 'Post body must not exceed 500 characters',
                },
            },
        },
    }, {
        freezeTableName: true,
    });
    Post.associate = (models) => {
        Post.belongsTo(models.User);
    };
    // Post.associate = (models) => {
    //     Post.hasMany(models.Like);
    // };
    // Post.associate = (models) => {
    //     Post.hasMany(models.Comment);
    // };
    return Post;
};
