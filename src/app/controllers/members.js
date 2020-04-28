const { age, date } = require('../../lib/utils');

// Exportando com method shorthand ES6

module.exports = {
  index(req, res) {
    return res.render('members/index');
  },

  create(req, res) {
    return res.render('members/create');
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    const isValid = keys.some((key) => {
      return req.body[key] === '';
    });

    if (isValid) {
      return res.send('Please, fill all fields!');
    }

    return this;
  },

  show(req, res) {
    return res.render('members/show');
  },

  edit(req, res) {
    return res.render('members/edit');
  },

  put(req, res) {
    const keys = Object.keys(req.body);

    const isValid = keys.some((key) => {
      return req.body[key] === '';
    });

    if (isValid) {
      return res.send('Please, fill all fields!');
    }

    return res.status(200).redirect(`/members`);
  },

  detele(req, res) {
    return res.send('OK');
  },
};
