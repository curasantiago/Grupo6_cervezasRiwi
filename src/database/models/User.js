module.exports = (sequelize, dataTypes) => {

    let alias = 'Users';

    let cols = {
        first_name: dataTypes.STRING,
        last_name: dataTypes.STRING,
        email: dataTypes.STRING,
        birthdate: dataTypes.DATE,
        address: dataTypes.STRING,
        password: dataTypes.STRING
    }

    config = {
        tableName: 'users',
        paranoid: true
    }

    let Users = sequelize.define(alias, cols, config);

    return Users;

}