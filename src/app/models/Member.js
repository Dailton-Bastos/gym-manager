/* eslint-disable no-throw-literal */
const { date } = require('../../lib/utils');

const db = require('../../config/db');

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM members ORDER BY name ASC`, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      return callback(results.rows);
    });
  },

  create(data, callback) {
    const query = `
    INSERT INTO members (
      name,
      avatar_url,
      email,
      gender,
      birth,
      blood,
      weight,
      height
    ) VALUES ($1,$2,$3,$4,$5,$6, $7, $8)
    RETURNING id
  `;

    const {
      name,
      avatar_url,
      email,
      gender,
      birth,
      blood,
      weight,
      height,
    } = data;

    const values = [
      name,
      avatar_url,
      email,
      gender,
      date(birth).iso,
      blood,
      weight,
      height,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      return callback(results.rows[0]);
    });
  },

  find(id, callback) {
    db.query(`SELECT * FROM members WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;

      return callback(results.rows[0]);
    });
  },

  update(data, callback) {
    const query = `
      UPDATE members SET
      name=($1),
      avatar_url=($2),
      email=($3),
      gender=($4),
      birth=($5),
      blood=($6),
      weight=($7),
      height=($8)
      WHERE id=$9
    `;

    const {
      name,
      avatar_url,
      email,
      gender,
      birth,
      blood,
      weight,
      height,
      id,
    } = data;

    const values = [
      name,
      avatar_url,
      email,
      gender,
      date(birth).iso,
      blood,
      weight,
      height,
      id,
    ];

    db.query(query, values, (err) => {
      if (err) throw `Database Error! ${err}`;

      return callback();
    });
  },

  delete(id, callback) {
    db.query(`DELETE FROM members WHERE id = $1`, [id], (err) => {
      if (err) throw `Database Error! ${err}`;

      return callback();
    });
  },
};
