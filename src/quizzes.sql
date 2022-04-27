DROP TABLE IF EXISTS quizzes;
CREATE TABLE quizzes (
    id               INT AUTO_INCREMENT,
    user_id               INT NOT NULL,
    active           BOOLEAN NOT NULL,
  PRIMARY KEY (`id`)
);

-- INSERT INTO quizzes
--   (user_id , active) 
-- VALUES
-- (
--     2,
--     'true'
-- );