/**
 * Created by barrett on 29/9/2017.
 */

var mysql = require('mysql');
var dbconfig = require('../componens/configs');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

//connection.query('\
//CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.cases_table + '` ( \
//    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
//    `username` VARCHAR(20) NOT NULL, \
//    `password` CHAR(60) NOT NULL, \
//        PRIMARY KEY (`id`), \
//    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
//    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
//)');

console.log('Success: Database Created!')

connection.end();
