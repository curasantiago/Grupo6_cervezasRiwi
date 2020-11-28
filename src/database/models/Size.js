module.exports = (sequelize, dataTypes) => {

    let alias = 'Sizes';

    let cols = {
        value: dataTypes.INTEGER,
    }

    config = {
        tableName: 'sizes',
        timestamps: true
    }

    let Sizes = sequelize.define(alias, cols, config);

    Sizes.associate = (models) => {
        Sizes.hasMany(models.Products, {
            as: 'size_product',
            foreignKey: 'id_size'
        })
    }

    return Sizes;

}