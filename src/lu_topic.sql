DROP TABLE IF EXISTS lu_topic;
CREATE TABLE lu_topic (
    id               INT AUTO_INCREMENT,
    topic             VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO lu_topic
  (topic) 
VALUES
(
    'git'
),(   
   'node'
),(
   'general'
),(
   'linux'
),(
    'docker'
),(
    'kubernetes'
),(
   'fun'
)