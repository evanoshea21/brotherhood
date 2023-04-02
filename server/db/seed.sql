USE MensSiteDB;

INSERT INTO users (email, fname, lname, city, pic, bio, date_of_birth, join_date, member_type)
VALUES ("floydwilliams@gmail.com", "Floyd", "Williams", "Snohomish", "https://images.unsplash.com/photo-1583123810408-23e7b5d1af9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmxhY2slMjBndXl8ZW58MHx8MHx8&w=1000&q=80", "Hi. I would love to improve my public speaking skills so I can give presentations at my work place.", DATE '1997-08-22', DATE '2023-03-16', 'limited');

INSERT INTO users (email, fname, lname, city, pic, bio, date_of_birth, join_date, member_type)
VALUES ("ryanlo@gmail.com", "Ryan", "Lo", "Bothell", "https://www.spectator.co.uk/wp-content/uploads/2021/01/Charles-Yu-%C2%A9-Tina-Chiou._r1.jpg?w=730", "I'm trying to demand more respect at work so I can hopefully get a promotion. This requires I speak more eloquently to my superiors. Help would be awesome, thank you.", DATE '1994-08-21', DATE '2022-12-14', 'member');

INSERT INTO users (email, fname, lname, city, pic, bio, date_of_birth, join_date, member_type)
VALUES ("marctheman2@gmail.com", "Marc", "Levinson", "Everett", "https://ethics.harvard.edu/sites/hwpi.harvard.edu/files/styles/profile_full/public/center-for-ethics/files/frankel.jpg?m=1641499690&itok=srm0ZobC", "I just want to meet new people here, but getting more comfortable at public speaking would be a huge bonus!", DATE '2000-02-11', DATE '2023-03-18', 'member');

INSERT INTO users (email, fname, lname, city, pic, bio, date_of_birth, join_date, member_type)
VALUES ("andybon@gmail.com", "Andrew", "Bonicci", "Kirkland", "https://www.superprof.com/images/teachers/teacher-home-young-italian-man-graduate-philosophy-and-geography-gives-lessons-brighton.jpg", "I am a best man at my friend's wedding so I want to have a killer toast when it comes around to the big day.", DATE '2001-08-21', DATE '2023-03-22', 'member');

INSERT INTO users (email, fname, lname, city, pic, bio, date_of_birth, join_date, member_type)
VALUES ("arnold23@gmail.com", "Arnold", "Richardson", "Seattle", "https://image1.masterfile.com/getImage/NjAwLTA3MTU2MTg5ZW4uMDAwMDAwMDA=AI9JB7/600-07156189en_Masterfile.jpg", "I would love to someday be a keynote speaker at a TedX, and this involves getting over my fear of large groups.", DATE '2002-08-21', DATE '2023-03-18', 'admin');

INSERT INTO users (email, fname, lname, city, pic, bio, date_of_birth, join_date, member_type)
VALUES ("marcuscho@gmail.com", "Marcus", "Cho", "Mill Creek", "https://media.istockphoto.com/id/1288538088/photo/portrait-young-confident-smart-asian-businessman-look-at-camera-and-smile.jpg?s=612x612&w=0&k=20&c=qkOwVHZFC-fbtbTnufVGaXFhnQBcfEjzbu5ThSXVLR0=", "I want to learn how to improve my speaking skills in general.", DATE '1999-08-21', DATE '2023-01-18', 'member');

INSERT INTO users (email, fname, lname, city, pic, bio, date_of_birth, join_date, member_type)
VALUES ("jeffrey23@gmail.com", "Jeff", "Stevenson", "Richmond", "https://theaggie.org/wp-content/uploads/2017/09/headshot_NI.png", "I'm warming up for a competition in my debate class and would love some feedback on my tone.", DATE '1998-04-22', DATE '2023-03-28', 'member');


--  BADGES --------------

INSERT INTO badges (name, requirements, rundown, description, image_path)
VALUES ("Attend your First Meeting", "['Do X','And Y', 'And Z Last']", "Show Up and Earn your First Badge", "By attending our club meeting, you are demonstrating to us and to yourself that you are taking this challenge of public speaking seriously.", "/badges/green.png");
INSERT INTO badges (name, requirements, rundown, description, image_path)
VALUES ("First Speech", "['Do this','And This', 'Video yourself']", "Give your first Speech", "Give your first speech in front of the group. You'll introduce yourself and receive feedback so you have a clear starting point in your journey to becoming better!", "/badges/high-gold.png");
INSERT INTO badges (name, requirements, rundown, description, image_path)
VALUES ("Rhetorical", "['Do this','And XYZ', 'Post video on IG']", "Build a Slideshow and make an Argument", "You will build a slideshow and pick a topic you want to share and convince the audience of. This involves research, focusing on evidence, tone, and delivery to be persuasive and likeable towards the audience.", "/badges/red.png");
INSERT INTO badges (name, requirements, rundown, description, image_path)
VALUES ("Tell a Story", "['Do this','And XYZ', 'Post video on IG']", "Recite from memory a Story", "Practice your ability to pace yourself and nail the qualities of a good storyteller. This involves setting the scene, building tension, and surprising your audience with a climactic event of some sort.", "/badges/gold.png");
INSERT INTO badges (name, requirements, rundown, description, image_path)
VALUES ("Engage the Audience", "['Do this','And XYZ', 'Post video on IG']", "Involve the audience and Improvise", "This challenge involves Preparing a speech that serves like a group discussion. You will request engagement from the audience and must think on your feet to keep the conversation going.", "/badges/blue.png");

--  BADGES EARNED --------------

INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story)
VALUES (5, 2, DATE '2023-03-18', 'For his first speech, he did a great job. He posted the video of it online. Check his notion page!');
INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story)
VALUES (5, 3, DATE '2023-03-18', 'He gave a great speech on the importance of hydro-electric power in washington state, and how its our repsonsibility to protect wildlife around the dams.');
INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story)
VALUES (5, 1, DATE '2023-03-18', 'He was very engaging in his first meeting.');
INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story)
VALUES (5, 5, DATE '2023-03-18', 'He has some work to do with engaging the audience, but his conversational tone was great.');
INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story)
VALUES (5, 4, DATE '2023-03-18', 'He told a story about getting his first dog and how it almost ran away the first day he owned it. Exciting ending.');


INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story)
VALUES (1, 1, DATE '2023-03-18', 'He showed up and was very engaging!');
INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story)
VALUES (1, 2, DATE '2023-03-18', 'He gave his first speech and posted a video online. Here is the link: https://youtube.com/his-video-k9knal');
INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story)
VALUES (1, 5, DATE '2023-03-18', 'He kept the audience very engaged with this story about an altercation with someone at a football game.');

INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story)
VALUES (4, 1, DATE '2023-02-12', 'He attended his first meeting');
INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story, verified)
VALUES (4, 2, DATE '2023-06-28', 'His first speech was a great introduction to why he joined.', 0);
INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story, verified)
VALUES (4, 3, DATE '2023-06-28', 'He gave a debate on why politics is so polarizing in America.', 1);

INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story)
VALUES (3, 1, DATE '2023-02-12', 'In his first meeting X shared his excitement to join the group.');
INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story, verified)
VALUES (3, 2, DATE '2023-06-28', 'He shared with the group his hesitation to join.', 1);
INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story, verified)
VALUES (3, 5, DATE '2023-06-28', 'He engaged the audience by inviting disagreement in his opinion on fast food chains.', 1);

INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story, verified)
VALUES (6, 1, DATE '2023-06-28', 'He showed up ready.', 1);
INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story, verified)
VALUES (6, 2, DATE '2023-06-28', 'He introduced himself very well, talking about his previous experience in public speaking.', 1);

INSERT INTO badges_earned (user_id, badge_id, date_earned, victory_story, verified)
VALUES (2, 1, DATE '2023-06-28', 'He showed up ready to engage.', 1);