/* eslint-disable no-param-reassign */
const { date } = require('../../lib/utils');

const Member = require('../models/Member');

module.exports = {
  index(req, res) {
    Member.all((members) => {
      return res.render('members/index', { members });
    });
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

    Member.create(req.body, (member) => {
      return res.redirect(`/members/${member.id}`);
    });

    return this;
  },

  show(req, res) {
    const { id } = req.params;

    Member.find(id, (member) => {
      if (!member) return res.send('Member not found');

      member.birth = date(member.birth).birthDay;

      return res.render('members/show', { member });
    });
  },

  edit(req, res) {
    const { id } = req.params;

    Member.find(id, (member) => {
      if (!member) return res.send('Member not found');

      member.birth = date(member.birth).iso;

      return res.render('members/edit', { member });
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

    Member.update(req.body, () => {
      return res.status(200).redirect(`/members/${id}`);
    });
    return this;
  },

  delete(req, res) {
    const { id } = req.body;

    Member.delete(id, () => {
      return res.redirect(`/members`);
    });
  },
};
