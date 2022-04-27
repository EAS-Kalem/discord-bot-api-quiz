DROP TABLE IF EXISTS quiz_questions;
CREATE TABLE quiz_questions (
    id                  INT AUTO_INCREMENT,
    quiz_id            INT NOT NULL,
    question_id        INT NOT NULL,
    asked               BOOLEAN NOT NULL,
  PRIMARY KEY (`id`)
);
