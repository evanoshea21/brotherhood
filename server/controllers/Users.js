const db = require('../db');

module.exports = {

  createUser: (req, res) => {
    const data = req.body;

    let qString = `INSERT INTO users (email, fname, lname, city, pic, date_of_birth, join_date)
    VALUES ("bobj3@gmail.com", "ncj", "ajks", "everett", "pic", DATE '1999-08-21', DATE '2023-03-18');`;

    db.query(qString, function(err, results) {
      if(err) {
        console.log('Error in Controllers: \n', err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      // res.status(200).send(results);
      res.status(200).send('user created!');
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
    const id = req.params.id
    // console.log('GETTING USER with email of', userEmail);

    const qString = `SELECT * FROM users WHERE id = '${id}';`;

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