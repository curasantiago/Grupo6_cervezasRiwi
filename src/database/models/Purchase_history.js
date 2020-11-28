module.exports = (sequelize, dataTypes) => {

    let alias = 'Purchase_histories';

    let cols = {
        id_cart: dataTypes.INTEGER,
        id_product: dataTypes.INTEGER,
        quantity: dataTypes.INTEGER,
        subtotal: dataTypes.INTEGER,
    }

    config = {
        tableName: 'purchase_histories',
        timestamps: true
    }

    let Purchase_histories = sequelize.define(alias, cols, config);

    return Purchase_histories;
}