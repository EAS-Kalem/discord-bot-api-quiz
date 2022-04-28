DROP TABLE IF EXISTS scores_table;
CREATE TABLE scores_table (
    id                       INT AUTO_INCREMENT,
    user_id                     INT NOT NULL,
    totalQuestions           INT NOT NULL,
    totalScore               INT NOT NULL,
  PRIMARY KEY (`id`)
);

