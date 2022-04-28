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
    'git commit'
),(   
    3,
    'What is a popular package manager used for a mac?',
    'homebrew'
),(
    5,
    'What does the linux command ls do?',
    'list files in current directory'
),(
    3,
    'What OS is chocolatey used on?',
    'windows'
),(
    5,
    'What does mkdir do as a linux command?',
    'make a directory'
),(
    3,
    'What is a docker container?',
    'a isolated enviroment for running an app'
),(
    2,
    'How would you check your node version?',
    'node -v'
),(  
   6,
    'What is docker?',
    'a platform for building running and shipping containers'
),(
    5,
    'Does linux use forward slashes or back slashes?',
    'forward'
),(
    5,
    'What does CD linux command do?',
    'change directory'
),(
    1,
    'What GIT command would you use to create a directory?',
    'git init'
),(
    1,
    'What is GIT?',
    'a version control system'
),(
    7,
    'What is kubernetes used for?',
    'application deployment'
),(
    3,
    'What is the fastest way to find anything on a MAC?',
    'command + space'
),(
    2,
    'What is NPM?',
    'node package manager'
);