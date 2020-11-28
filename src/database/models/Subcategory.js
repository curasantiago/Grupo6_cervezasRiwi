
module.exports = (sequelize, dataTypes) => {

    let alias = 'SubCategories';

    let cols = {
        name: dataTypes.STRING,
        id_category: dataTypes.INTEGER
    }

    config = {
        tableName: 'subcategories',
        timestamps: true
    }

    let SubCategories = sequelize.define(alias, cols, config);


    SubCategories.associate = (models) => {

        SubCategories.hasMany(models.Products, {
            as: 'product',
            foreignKey: 'id_subcategory'
        })

        SubCategories.belongsTo(models.Categories, {
            as: 'subcategory_categories',
            foreignKey: 'id_category'
        })


    }

    return SubCategories;

}