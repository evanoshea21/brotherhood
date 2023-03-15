const db = require('../db');

module.exports = {

  createUser: (req, res) => {
    const data = req.body;

    let qString = `INSERT INTO users (email, name, pic, bio) VALUES ("${data.email}", "${data.name}", "${data.pic}", "${data.bio}");`;

    db.query(qString, function(err, results) {
      if(err) {
        console.log('Error in Controllers: \n', err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      res.status(200).send(results);
    })
  },

  deleteUser: (req, res) => {
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
  getUser: (req, res) => {
    const entry = req.query.email
    // console.log('GETTING USER with email of', userEmail);

    const qString = `SELECT * FROM users WHERE email = '${entry}';`;

    db.query(qString, function (err, results) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      res.status(200).send(results);
    });
  },

  getAllUsers: (req, res) => {
    const qString = `SELECT * FROM users;`;
    console.log('got to getAllUsers!')

    db.query(qString, function (err, results) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      res.status(200).send(results);
    });
  },

};