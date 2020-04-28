const { age, date } = require('../../lib/utils');

// Exportando com method shorthand ES6

module.exports = {
  index(req, res) {
    return res.render('instructors/index');
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

    const { avatar_url, name, birth, gender, services } = req.body;

    return this;
  },

  show(req, res) {
    return res.render('instructors/show');
  },

  edit(req, res) {
    return res.render('instructors/edit');
  },

  put(req, res) {
    const keys = Object.keys(req.body);

    const isValid = keys.some((key) => {
      return req.body[key] === '';
    });

    if (isValid) {
      return res.send('Please, fill all fields!');
    }

    return res.status(200).redirect(`/instructors`);
  },

  delete(req, res) {
    return res.send('OK');
  },
};
