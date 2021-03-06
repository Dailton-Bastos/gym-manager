/* eslint-disable no-param-reassign */
const { age, date } = require('../../lib/utils');

const Instructor = require('../models/Instructor');

// Exportando com method shorthand ES6
module.exports = {
  index(req, res) {
    let { page, limit } = req.query;
    const { filter } = req.query;

    page = page || 1;
    limit = limit || 2;

    const offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(instructors) {
        const pagination = {
          total: Math.ceil(instructors[0].total / limit),
          page,
        };
        return res.render('instructors/index', {
          instructors,
          pagination,
          filter,
        });
      },
    };

    Instructor.paginate(params);
  },

  create(req, res) {
    return res.render('instructors/create');
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    const isValid = keys.some((key) => {
      return req.body[key] === '';
    });

    if (isValid) {
      return res.send('Please, fill all fields!');
    }

    Instructor.create(req.body, (instructor) => {
      return res.redirect(`/instructors/${instructor.id}`);
    });

    return this;
  },

  show(req, res) {
    const { id } = req.params;

    Instructor.find(id, (instructor) => {
      if (!instructor) return res.send('Instructor not found');

      instructor.age = age(instructor.birth);
      instructor.services = instructor.services.split(', ');
      instructor.created_at = date(instructor.created_at).format;

      return res.render('instructors/show', { instructor });
    });
  },

  edit(req, res) {
    const { id } = req.params;

    Instructor.find(id, (instructor) => {
      if (!instructor) return res.send('Instructor not found');

      instructor.birth = date(instructor.birth).iso;

      return res.render('instructors/edit', { instructor });
    });
  },

  put(req, res) {
    const keys = Object.keys(req.body);

    const isValid = keys.some((key) => {
      return req.body[key] === '';
    });

    if (isValid) {
      return res.send('Please, fill all fields!');
    }

    const { id } = req.body;

    Instructor.update(req.body, () => {
      return res.status(200).redirect(`/instructors/${id}`);
    });
    return this;
  },

  delete(req, res) {
    const { id } = req.body;

    Instructor.delete(id, () => {
      return res.redirect(`/instructors`);
    });
  },
};
