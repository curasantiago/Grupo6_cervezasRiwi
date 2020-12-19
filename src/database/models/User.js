module.exports = (sequelize, dataTypes) => {

    let alias = 'Users';

    let cols = {
        first_name: dataTypes.STRING,
        last_name: dataTypes.STRING,
        email: dataTypes.STRING,
        birthdate: dataTypes.DATE,
        address: dataTypes.STRING,
        password: dataTypes.STRING,
        image: dataTypes.STRING
    }

    config = {
        tableName: 'users',
        timestamps: true
    }

    let Users = sequelize.define(alias, cols, config);

    Users.associate = (models) => {

        Users.hasMany(models.Carts, {
            as: 'cart',
            foreignKey: 'user_id'
        })
    }

    return Users;

}