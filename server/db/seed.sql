USE MensSiteDB;


INSERT INTO users (email, fname, lname, city, pic, bio, date_of_birth, join_date)
VALUES ("bob@gmail.com", "Bobby", "Dougal", "Richmond", "https://pyxis.nymag.com/v1/imgs/451/ba2/6f22dfb79768b5c0841c4570cbd8cfb7bf-13-armond-white-2.rsquare.w330.jpg", "i love working out", DATE '1998-04-22', DATE '2023-03-18');

INSERT INTO users (email, fname, lname, city, pic, bio, date_of_birth, join_date)
VALUES ("bob1@gmail.com", "Chris", "Evans", "Bothell", "https://pyxis.nymag.com/v1/imgs/451/ba2/6f22dfb79768b5c0841c4570cbd8cfb7bf-13-armond-white-2.rsquare.w330.jpg", "i love pumping iron", DATE '1997-08-21', DATE '2023-03-18');

INSERT INTO users (email, fname, lname, city, pic, bio, date_of_birth, join_date)
VALUES ("bob2@gmail.com", "Bill", "Joe", "Everett", "https://pyxis.nymag.com/v1/imgs/451/ba2/6f22dfb79768b5c0841c4570cbd8cfb7bf-13-armond-white-2.rsquare.w330.jpg", "let's fucking go boys", DATE '2000-08-21', DATE '2023-03-18');

INSERT INTO users (email, fname, lname, city, pic, bio, date_of_birth, join_date)
VALUES ("bob3@gmail.com", "Simon", "Jelle", "Kirkland", "https://pyxis.nymag.com/v1/imgs/451/ba2/6f22dfb79768b5c0841c4570cbd8cfb7bf-13-armond-white-2.rsquare.w330.jpg", "i want to be around ambitious people", DATE '1999-08-21', DATE '2023-03-18');

INSERT INTO users (email, fname, lname, city, pic, bio, date_of_birth, join_date)
VALUES ("bob4@gmail.com", "Emit", "Crok", "Lynwood", "https://pyxis.nymag.com/v1/imgs/451/ba2/6f22dfb79768b5c0841c4570cbd8cfb7bf-13-armond-white-2.rsquare.w330.jpg", "I want to learn how to improve my speaking skills", DATE '1993-08-21', DATE '2023-03-18');


--  BADGES --------------

INSERT INTO badges (name, requirements, rundown, description, image_path)
VALUES ("Push500", "['Do this','And This', 'Video yourself']", "500 pushups in one go", "Complete 500 pushups in one go. You have to do this by filming a video etc more info on this badge....yeah so complete it and fill out form.", "/badges/red.png");
INSERT INTO badges (name, requirements, rundown, description, image_path)
VALUES ("First Speech", "['Do X','And Y', 'And Z Last']", "Pick a topic, craft a speech, and deliver in front of the group.", "Pick topic, do speech. So you have to do this by filming a video etc more info on this badge....yeah so complete it and fill out form.", "/badges/green.png");
INSERT INTO badges (name, requirements, rundown, description, image_path)
VALUES ("Run 5", "['Do this','And XYZ', 'Post video on IG']", "Complete a 5mile run before 7am.", "Complete a 5mile run before 7am. You have to do this by filming a video etc more info on this badge....yeah so complete it and fill out form.", "/badges/blue.png");

--  BADGES EARNED --------------

INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story)
VALUES (1, 1, DATE '2023-03-18', 'He did the pushups and posted a video online. Here is the link: https://youtube.com');

INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story)
VALUES (1, 2, DATE '2023-02-12', 'He gave the speech and posted the vid online. Link: https://youtube.com');

INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story, verified)
VALUES (2, 3, DATE '2023-06-28', 'He ran with Alex and they completed run at 6:43am.', 1);