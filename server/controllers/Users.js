const db = require('../db');

module.exports = {

  createUser: (req, res) => {
    const {body} = req;

    let qString = `INSERT INTO users (email, fname, lname, city, pic, date_of_birth, join_date)
    VALUES ("${body.email}", "${body.fname}", "${body.lname}", "${body.city}", "${body.pic}", DATE '${body.date_of_birth}', DATE '${body.join_date}');`;

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

  updateUserMember: (req, res) => {
    const {body} = req;
    const picUpdate = body?.pic ? `, pic = "${body.pic}"` : '';

    let qString = `UPDATE users SET fname = "${body.fname}", lname = "${body.lname}", city = "${body.city}", bio = "${body.bio}" ${picUpdate} WHERE id = ${body.id};`;

    db.query(qString, function(err, results) {
      if(err) {
        console.log('Error in Controllers: \n', err);
        res.status(500).send(err);
        return;
      }
      res.status(200).send(results);
    })
  },
  updateUserAdmin: (req, res) => {
    const {body} = req;

    let qString = `INSERT INTO users (email, fname, lname, city, pic, date_of_birth, join_date)
    VALUES ("${body.email}", "${body.fname}", "${body.lname}", "${body.city}", "${body.pic}", DATE '${body.date_of_birth}', DATE '${body.join_date}');`;

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
    const email = req.params.email
    const id = req.params.id
    const whereClaus = id ? `WHERE id = ${id}` : `WHERE email = "${email}"`;
    // console.log('GETTING USER with email of', userEmail);

    const qString = `SELECT * FROM users ${whereClaus};`;

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