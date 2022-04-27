DROP TABLE IF EXISTS quiz_answers;
CREATE TABLE quiz_answers (
    id               INT AUTO_INCREMENT,
    result               BOOLEAN NOT NULL,
    user_id         INT NOT NULL,
    quiz_question_id           INT NOT NULL,
    answer          VARCHAR(800) NOT NULL,
    
  PRIMARY KEY (`id`)
);

