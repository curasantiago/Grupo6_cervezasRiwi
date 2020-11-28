module.exports = (sequelize, dataTypes) => {

    let alias = 'Admins';

    let cols = {
        username: dataTypes.STRING,
        password: dataTypes.STRING,
    }

    config = {
        tableName: 'admins',
        timestamps: true
    }

    let Admins = sequelize.define(alias, cols, config);

    return Admins;

}