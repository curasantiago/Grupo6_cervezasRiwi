module.exports = (sequelize, dataTypes) => {

    let alias = 'Products';

    let cols = {
        name: dataTypes.STRING,
        info: dataTypes.STRING,
        price: dataTypes.INTEGER,
        image: dataTypes.STRING,
        id_size: dataTypes.INTEGER,
        id_category: dataTypes.INTEGER,
        id_subcategory: dataTypes.INTEGER,
    }

    config = {
        tableName: 'products'
    }

    let Products = sequelize.define(alias, cols, config);

    return Products;

}