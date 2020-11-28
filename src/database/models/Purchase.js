module.exports = (sequelize, dataTypes) => {

    let alias = 'Purchases';

    let cols = {
        id_user: dataTypes.INTEGER,
        id_cart: dataTypes.INTEGER,
        id_card: dataTypes.INTEGER,
        total: dataTypes.INTEGER,
    }

    config = {
        tableName: 'purchases',
        timestamps: true
    }

    let Purchases = sequelize.define(alias, cols, config);

    return Purchases;
}