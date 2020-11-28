module.exports = (sequelize, dataTypes) => {

    let alias = 'Products';

    let cols = {
        name: dataTypes.STRING,
        info: dataTypes.STRING,
        price: dataTypes.INTEGER,
        image: dataTypes.STRING,
        id_size: dataTypes.INTEGER,
        id_subcategory: dataTypes.INTEGER,
    }

    config = {
        tableName: 'products',
        timestamps: true
    }

    let Products = sequelize.define(alias, cols, config);

    Products.associate = (models) => {
        Products.belongsTo(models.SubCategories, {
            as: 'subcategory',
            foreignKey: 'id_subcategory'
        });

    
        Products.belongsTo(models.Sizes, {
            as: 'size',
            foreignKey: 'id_size'
        })
    }

    return Products;

}