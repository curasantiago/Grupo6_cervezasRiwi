
module.exports = (sequelize, dataTypes) => {

    let alias = 'Categories';

    let cols = {
        name: dataTypes.STRING,
    }

    config = {
        tableName: 'categories'
    }

    let Categories = sequelize.define(alias, cols, config);

    return Categories;

}