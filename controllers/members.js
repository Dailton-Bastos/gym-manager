const fs = require('fs');
const data = require('../data.json');
const { getBirth } = require('../utils');

const { members } = data;

exports.index = (req, res) => {
  return res.render('members/index', { members });
};

exports.show = (req, res) => {
  const { id } = req.params;

  const foundMember = data.members.find((member) => {
    return member.id === +id;
  });

  if (!foundMember) return res.send('Member not found!');

  const member = {
    ...foundMember,
    birth: getBirth(foundMember.birth).birthDay,
  };

  return res.render('members/show', { member });
};

exports.create = (req, res) => {
  return res.render('members/create');
};

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  const isValid = keys.some((key) => {
    return req.body[key] === '';
  });

  if (isValid) {
    return res.send('Please, fill all fields!');
  }

  const id = +Math.random().toFixed(4);
  data.members.push({
    id,
    ...req.body,
    birth: Date.parse(req.body.birth),
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error');
    return true;
  });
  return res.redirect(`/members/${id}`);
};

exports.edit = (req, res) => {
  const { id } = req.params;

  const foundMember = data.members.find((member) => {
    return member.id === +id;
  });

  const member = {
    ...foundMember,
    birth: getBirth(foundMember.birth).iso,
  };

  if (!foundMember) return res.send('Member not found!');

  return res.render('members/edit', { member });
};

exports.put = (req, res) => {
  const { id } = req.body;

  let index = 0;
  const foundMember = data.members.find((member, foundIndex) => {
    index = foundIndex;
    return member.id === +id;
  });

  if (!foundMember) return res.send('Member not found!');

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: +id,
  };

  data.members[index] = member;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error');
    return true;
  });
  return res.status(200).redirect(`/members/${id}`);
};

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredMembers = data.members.filter((member) => {
    return member.id !== +id;
  });

  data.members = filteredMembers;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error');
    return true;
  });

  return res.status(200).redirect('/members');
};
