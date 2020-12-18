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
    
    Purchase_histories.associate = (models) => {
        
        Purchase_histories.belongsTo(models.Carts, {
            as: 'cart',
            foreignKey: 'id_cart'
        });

        Purchase_histories.belongsTo(models.Products, {
            as: 'product',
            foreignKey: 'id_product'
        })
    }


    return Purchase_histories;
}