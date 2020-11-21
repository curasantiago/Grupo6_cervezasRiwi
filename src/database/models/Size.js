module.exports = (sequelize, dataTypes) => {

    let alias = 'Sizes';

    let cols = {
        value: dataTypes.INTEGER,
    }

    config = {
        tableName: 'sizes'
    }

    let Sizes = sequelize.define(alias, cols, config);

    return Sizes;

}