module.exports = (sequelize, dataTypes) => {

    let alias = 'Carts';

    let cols = {
        user_id: dataTypes.INTEGER
    }

    config = {
        tableName: 'carts',
        timestamps: true
    }

    let Carts = sequelize.define(alias, cols, config);

    return Carts;
}