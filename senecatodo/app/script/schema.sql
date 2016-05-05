/* execute using mysql -u root < dbschema.sql */

DROP DATABASE IF EXISTS senecatest;
CREATE DATABASE senecatest;

USE senecatest;

/*CREATE TABLE toDOTable (id VARCHAR(36), taskName VARCHAR(255));*/

/*CREATE TABLE toDOTable (id int(11) NOT NULL AUTO_INCREMENT, taskName VARCHAR(255));*/

/* Create user senecatest with harmless privilege so that DROP USER does not throw error on next line if user does not exist */
/*GRANT USAGE ON *.* TO 'senecatest'@'localhost';*/
/*DROP USER 'senecatest'@'localhost';*/
/*CREATE USER 'senecatest'@'localhost' IDENTIFIED BY 'senecatest';*/
/*GRANT ALL PRIVILEGES ON senecatest.* TO senecatest@localhost;*/
/*FLUSH PRIVILEGES;





