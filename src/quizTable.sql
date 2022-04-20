DROP TABLE IF EXISTS quiz_table;
CREATE TABLE quiz_table (
    id               INT AUTO_INCREMENT,
    question         VARCHAR(256) NOT NULL,
    answer           VARCHAR(256) NOT NULL,
    topic            VARCHAR(256) NOT NULL,
    asked            VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO quiz_table 
  (question, answer, topic, asked) 
VALUES
(
    'What command do you use to commit using git?',
    'Git commit',
    'Git',
    'false'
),(   
    'What is a popular package manager used for a mac?',
    'Homebrew',
    'General',
    'false'
),(
    'What does the linux command ls do?',
    'List files in current directory',
    'Linux',
    'false'
),(
    'What OS is chocolatey used on?',
    'Windows',
    'General',
    'false'
),(
    'What does mkdir do as a linux command?',
    'Make a directory',
    'Git',
    'false'
),(
    'What is a docker container?',
    'A isolated enviroment for running an app',
    'General',
    'false'
),(
    'How would you check your node version?',
    'node -v',
    'Node',
    'false'
),(
    'What is docker?',
    'A platform for building running and shipping containers',
    'Docker',
    'false'
),(
    'Does linux use forward slashes or back slashes?',
    'Forward',
    'Linux',
    'false'
),(
    'What does CD linux command do?',
    'Change directory',
    'Linux',
    'false'
),(
    'What GIT command would you use to create a directory?',
    'Git init',
    'Git',
    'false'
),(
    'What is GIT?',
    'A version control system',
    'Git',
    'false'
),(
    'What is kubernetes used for?',
    'Application deployment',
    'Kubernetes',
    'false'
),(
    'What is the fastest way to find anything on a MAC?',
    'command + space',
    'General',
    'false'
),(
    'What is NPM?',
    'Node package manager',
    'Node',
    'false'
);