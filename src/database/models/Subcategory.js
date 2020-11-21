
module.exports = (sequelize, dataTypes) => {

    let alias = 'SubCategories';

    let cols = {
        name: dataTypes.STRING,
        id_category: dataTypes.INTEGER
    }

    config = {
        tableName: 'subcategories'
    }

    let SubCategories = sequelize.define(alias, cols, config);

    return SubCategories;

}