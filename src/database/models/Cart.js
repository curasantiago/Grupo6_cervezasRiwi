module.exports = (sequelize, dataTypes) => {

    let alias = 'Carts';

    let cols = {
        user_id: dataTypes.INTEGER,
        total: dataTypes.INTEGER
    }

    config = {
        tableName: 'carts',
        timestamps: true
    }
    
    let Carts = sequelize.define(alias, cols, config);

    Carts.associate = (models) => {

        Carts.hasMany(models.Purchase_histories, {
            as: 'purchase_history',
            foreignKey: 'id_cart'
        })

        Carts.belongsTo(models.Users, {
            as: 'user',
            foreignKey: 'user_id'
        })
    }


    return Carts;
}