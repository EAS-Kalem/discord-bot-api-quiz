DROP TABLE IF EXISTS lu_questions;
CREATE TABLE lu_questions (
    id                  INT AUTO_INCREMENT,
    topic_id            INT NOT NULL,
    question           VARCHAR(800) NOT NULL,
    answer            VARCHAR(800) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO lu_questions 
  (topic_id, question, answer) 
VALUES
(
    1,
    'What command do you use to commit using git?',
    'Git commit'
),(   
    3,
    'What is a popular package manager used for a mac?',
    'Homebrew'
),(
    5,
    'What does the linux command ls do?',
    'List files in current directory'
),(
    3,
    'What OS is chocolatey used on?',
    'Windows'
),(
    5,
    'What does mkdir do as a linux command?',
    'Make a directory'
),(
    3,
    'What is a docker container?',
    'A isolated enviroment for running an app'
),(
    2,
    'How would you check your node version?',
    'node -v'
),(  
   6,
    'What is docker?',
    'A platform for building running and shipping containers'
),(
    5,
    'Does linux use forward slashes or back slashes?',
    'Forward'
),(
    5,
    'What does CD linux command do?',
    'Change directory'
),(
    1,
    'What GIT command would you use to create a directory?',
    'Git init'
),(
    1,
    'What is GIT?',
    'A version control system'
),(
    7,
    'What is kubernetes used for?',
    'Application deployment'
),(
    3,
    'What is the fastest way to find anything on a MAC?',
    'command + space'
),(
    2,
    'What is NPM?',
    'Node package manager'
);