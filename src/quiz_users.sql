DROP TABLE IF EXISTS quiz_users;
CREATE TABLE  quiz_users (
    id               INT AUTO_INCREMENT,
    nickname             VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`)
);
