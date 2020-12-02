
module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "riwicervezas",
<<<<<<< HEAD
    // "port": 8889,
=======
    "port": 3306, //3000
>>>>>>> 69bf973af00e4d830aae3450512c3fbdf0c5e400
    "host": "127.0.0.1",
    "dialect": "mysql",
    define:{
      underscored: true
      // paranoid: true
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
