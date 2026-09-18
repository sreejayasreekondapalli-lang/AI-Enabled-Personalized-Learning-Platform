USE `learning_platform`;

-- Seed competencies
INSERT INTO competencies (name, description) VALUES
('Statistical Analysis', 'Understanding and analyzing statistical data'),
('Data Collection', 'Knowledge of collecting official statistical data'),
('Data Interpretation', 'Ability to interpret statistical results'),
('Data Visualization', 'Understanding charts and graphical representation'),
('Statistical Methods', 'Knowledge of statistical methods and techniques')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Sample quiz, questions for topic 'Statistical Analysis'
INSERT INTO quizzes (title, material_id, competency_id, created_by, difficulty) VALUES ('Intro to Statistical Analysis', NULL, 1, NULL, 'Easy');
SET @quiz_id = LAST_INSERT_ID();

INSERT INTO questions (quiz_id, question_text, options, correct_answer, difficulty, topic) VALUES
(@quiz_id, 'What is the main purpose of statistical analysis?', JSON_ARRAY('To analyze data','To delete data','To hide data','To ignore data'), 'To analyze data', 'Easy', 'Statistical Analysis'),
(@quiz_id, 'Which method is commonly used to represent data visually?', JSON_ARRAY('Charts','Tables','Scripts','Folders'), 'Charts', 'Easy', 'Statistical Analysis');
