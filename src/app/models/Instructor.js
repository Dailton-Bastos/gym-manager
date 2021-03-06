/* eslint-disable no-throw-literal */
const { date } = require('../../lib/utils');

const db = require('../../config/db');

module.exports = {
  all(callback) {
    db.query(
      `
      SELECT instructors.*, count(members) AS total_students
      FROM instructors
      LEFT JOIN members ON (instructors.id = members.instructor_id)
      GROUP BY instructors.id
      ORDER BY total_students DESC
      `,
      (err, results) => {
        if (err) throw `Database Error! ${err}`;

        return callback(results.rows);
      }
    );
  },

  create(data, callback) {
    const query = `
    INSERT INTO instructors (
      name,
      avatar_url,
      gender,
      services,
      birth,
      created_at
    ) VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING id
  `;

    const { name, avatar_url, gender, services, birth } = data;

    const values = [
      name,
      avatar_url,
      gender,
      services,
      date(birth).iso,
      date(Date.now()).iso,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;

      return callback(results.rows[0]);
    });
  },

  find(id, callback) {
    db.query(
      `SELECT * FROM instructors WHERE id = $1`,
      [id],
      (err, results) => {
        if (err) throw `Database Error! ${err}`;

        return callback(results.rows[0]);
      }
    );
  },

  findBy(filter, callback) {
    db.query(
      `
      SELECT instructors.*, count(members) AS total_students
      FROM instructors
      LEFT JOIN members ON (instructors.id = members.instructor_id)
      WHERE instructors.name ILIKE '%${filter}%'
      OR instructors.services ILIKE '%${filter}%'
      GROUP BY instructors.id
      ORDER BY total_students DESC
      `,
      (err, results) => {
        if (err) throw `Database Error! ${err}`;

        return callback(results.rows);
      }
    );
  },

  update(data, callback) {
    const query = `
      UPDATE instructors SET
      avatar_url=($1),
      name=($2),
      birth=($3),
      gender=($4),
      services=($5)
      WHERE id=$6
    `;

    const { avatar_url, name, birth, gender, services, id } = data;

    const values = [avatar_url, name, date(birth).iso, gender, services, id];

    db.query(query, values, (err) => {
      if (err) throw `Database Error! ${err}`;

      return callback();
    });
  },

  delete(id, callback) {
    db.query(`DELETE FROM instructors WHERE id = $1`, [id], (err) => {
      if (err) throw `Database Error! ${err}`;

      return callback();
    });
  },

  paginate(params) {
    const { filter, limit, offset, callback } = params;

    let query = '';
    let filterQuery = '';
    let totalQuery = `(
      SELECT count(*) FROM instructors
    ) AS total`;

    if (filter) {
      filterQuery = `
        WHERE instructors.name ILIKE '%${filter}%'
        OR instructors.services ILIKE '%${filter}%'
      `;

      totalQuery = `(
        SELECT count(*) FROM instructors
        ${filterQuery}
      ) AS total`;
    }

    query = `
    SELECT instructors.*, ${totalQuery}, count(members) AS total_students
    FROM instructors
    LEFT JOIN members ON (instructors.id = members.instructor_id)
    ${filterQuery}
    GROUP by instructors.id LIMIT $1 OFFSET $2
    `;

    db.query(query, [limit, offset], (err, results) => {
      if (err) throw `Database Error! ${err}`;

      return callback(results.rows);
    });
  },
};
