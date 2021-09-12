module.exports = (sequelize, DataTypes) => {
    /**
     * The variable name User will get attached to the db object for querying the database
     * while the table name 'User' defined in single quotes is what appears in the database
     */
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            validate: {
                isEmail: true,
                message: (props) => `${props.value} is not a valid email address!`,
            },
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.CHAR(60),
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    });
    User.associate = (models) => {
        User.hasMany(models.Post, {
            onDelete: 'SET NULL',
            // Default for Sequelize onUpdate is already CASCADE
            // onUpdate: 'CASCADE',
        });
    };
    return User;
};
