CREATE TABLE users (userid INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
account VARCHAR(20),
usersalt VARCHAR(16),
password VARCHAR(128),
email VARCHAR(50),
create_time datetime,
update_time datetim);
