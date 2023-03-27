const db = require('../db');

module.exports = {

  getAll: (req, res) => {

    let qString = `SELECT * FROM badges;`;

    db.query(qString, function(err, results) {
      if(err) {
        console.log('Error in Controllers: \n', err);
        res.status(500).send(err.sqlMessage);
        return;
      }
      res.status(200).send(results);
    })
  },
  getAllEarned: (req, res) => {

    let qString = `SELECT * FROM badges_earned;`;

    db.query(qString, function(err, results) {
      if(err) {
        console.log('Error in Controllers: \n', err);
        res.status(500).send(err.sqlMessage);
        return;
      }
      res.status(200).send(results);
    })
  },

  getBadgesForUser: (req, res) => {
    const {params} = req;

    let qString = `SELECT * FROM badges_earned WHERE user_id = ${params.pid};`;

    db.query(qString, function(err, results) {
      if(err) {
        console.log('Error in Controllers: \n', err);
        res.status(500).send(err.sqlMessage);
        return;
      }
      res.status(200).send(results);
    })
  },

  getBadgeFromId: (req, res) => {
    const {params} = req;

    let qString = `SELECT * FROM badges WHERE id = ${params.id};`;

    db.query(qString, function(err, results) {
      if(err) {
        console.log('Error in Controllers: \n', err);
        res.status(500).send(err.sqlMessage);
        return;
      }
      res.status(200).send(results);
      // res.status(200).send('user created!');
    })
  },

  addBadge: (req, res) => {
    const {body} = req;

    let qString = `INSERT INTO badges (name, requirements, rundown, description, image_path) VALUES ('${body.name}', '${body.requirements}', '${body.rundown}', '${body.description}', '${body.image_path}');`;

    db.query(qString, function(err, results) {
      if(err) {
        console.log('Error in Controllers: \n', err);
        res.status(500).send(err);
        return;
      }
      res.status(200).send(results);
      // res.status(200).send('user created!');
    })
  },
  addBadgeEarned: (req, res) => {
    const {body} = req;

    let qString = `INSERT INTO badges_earned (user_id,badge_id, date_earned, victory_story, verified) VALUES (${body.user_id}, ${body.badge_id}, DATE '${body.date_earned}', "${body.victory_story}", ${body.verified});`;

    db.query(qString, function(err, results) {
      if(err) {
        console.log('Error in Controllers: \n', err);
        res.status(500).send(err.sqlMessage);
        return;
      }
      res.status(200).send(results);
      // res.status(200).send('user created!');
    })
  },










  deleteBadge: (req, res) => {
    const userEmail = req.query.email;

    let qString = `DELETE from users WHERE email='${userEmail}';`;

    db.query(qString, function(err, results) {
      if(err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      res.status(200).send(results);
    })

  },

};