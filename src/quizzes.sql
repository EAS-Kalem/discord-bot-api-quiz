DROP TABLE IF EXISTS quizzes;
CREATE TABLE quizzes (
    id               INT AUTO_INCREMENT,
    user_id               INT NOT NULL,
    active           BOOLEAN NOT NULL,
  PRIMARY KEY (`id`)
);

