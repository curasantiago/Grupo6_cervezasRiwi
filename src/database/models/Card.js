module.exports = (sequelize, dataTypes) => {

    let alias = 'Cards';

    let cols = {
        owner_card: dataTypes.STRING,
        number: dataTypes.INTEGER,
        expire_date: dataTypes.INTEGER,
        security_code: dataTypes.INTEGER,
        purchase_address: dataTypes.STRING,
        card_type: dataTypes.INTEGER,
        id_user: dataTypes.INTEGER
    }

    config = {
        tableName: 'cards',
        timestamps: true
    }

    let Cards = sequelize.define(alias, cols, config);


    return Cards;

}