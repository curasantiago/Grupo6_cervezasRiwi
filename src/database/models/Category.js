
module.exports = (sequelize, dataTypes) => {

    let alias = 'Categories';

    let cols = {
        name: dataTypes.STRING,
    }

    config = {
        tableName: 'categories',
        timestamps: true
    }

    let Categories = sequelize.define(alias, cols, config);

    Categories.associate = (models) => {
        Categories.hasMany(models.SubCategories, {
            as: 'categories_subcategory',
            foreignKey: 'id_category'
        })
    }

    return Categories;

}