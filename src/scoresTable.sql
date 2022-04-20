DROP TABLE IF EXISTS scores_table;
CREATE TABLE scores_table (
    id                       INT AUTO_INCREMENT,
    individual                     VARCHAR(256) NOT NULL,
    totalQuestions           VARCHAR(256) NOT NULL,
    totalScore               VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO scores_table 
  (individual, totalQuestions, totalScore ) 
VALUES
( 
    "Kaine",
    0,
    0  
),(
    "Kalem",
    0,
    0
),(
    "Harrison",
    0,
    0
),(
    "Rhys",
    0,
    0
),( 
    "Dave",
    0,
    0
),(
    "Ethan",
    0,
    0
),( 
    "Max",
    0,
    0
),( 
    "Clark",
    0,
    0
)