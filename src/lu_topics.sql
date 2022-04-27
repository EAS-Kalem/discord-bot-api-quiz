DROP TABLE IF EXISTS lu_topics;
CREATE TABLE lu_topics (
    id               INT AUTO_INCREMENT,
    topic             VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO lu_topics
  (topic) 
VALUES
(
    'git'
),(   
   'node'
),(
   'general'
),(
   'kubernetes'
),(
   'linux'
),(
    'docker'
),(
    'kubernetes'
);