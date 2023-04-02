DROP DATABASE IF EXISTS MensSiteDB;

CREATE DATABASE MensSiteDB;

USE MensSiteDB;


-- member type ->
--     limited, (just joined, can't view community)
--     member, (normal, edit your own stuff)
--     admin, (can grant badges to people)
--     superadmin (grant badges, delete users, edit users)

CREATE TABLE users (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `fname` VARCHAR(50) NOT NULL,
  `lname` VARCHAR(50) NOT NULL,
  `city` VARCHAR(50),
  `pic` VARCHAR(255) DEFAULT '/defaultProfilePic.jpeg',
  `bio` VARCHAR(1000) NULL,
  `member_type` VARCHAR(20) DEFAULT 'limited',
  `discord_handle` VARCHAR(50) NULL,
  `notion_link` VARCHAR(255) NULL,
  `speech_count` INT DEFAULT 0,
  `xp` INT DEFAULT 0,
  `date_of_birth` DATE NULL,
  `join_date` DATE NULL
);

CREATE TABLE badges (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(40) NOT NULL UNIQUE,
  `requirements` VARCHAR(400) NOT NULL,
  `rundown` VARCHAR(100) NOT NULL,
  `description` VARCHAR(400) NOT NULL,
  `image_path` VARCHAR(250) NOT NULL,
  `xp` INT DEFAULT 0
);

CREATE TABLE badges_earned (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `badge_id` INT NOT NULL,
  `date_earned` DATE NULL,
  -- `victory_title` VARCHAR(30) NULL,
  `victory_story` VARCHAR(400) NULL,
  `verified` TINYINT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (badge_id) REFERENCES badges(id)
);




