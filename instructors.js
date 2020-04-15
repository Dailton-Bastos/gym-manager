const fs = require('fs');
const data = require('./data.json');
const { getAge, getBirth } = require('./utils');

const { instructors } = data;

exports.index = (req, res) => {
  return res.render('instructors/index', { instructors });
};

exports.show = (req, res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return instructor.id === +id;
  });

  if (!foundInstructor) return res.send('Instructor not found!');

  const instructor = {
    ...foundInstructor,
    age: getAge(foundInstructor.birth),
    services: foundInstructor.services.split(', '),
    created_at: new Intl.DateTimeFormat('pt-BR').format(
      foundInstructor.created_at
    ),
  };

  return res.render('instructors/show', { instructor });
};

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  const isValid = keys.some((key) => {
    return req.body[key] === '';
  });

  if (isValid) {
    return res.send('Please, fill all fields!');
  }

  const { avatar_url, name, birth, gender, services } = req.body;

  data.instructors.push({
    id: +Math.random().toFixed(4),
    avatar_url,
    name,
    birth: Date.parse(birth),
    gender,
    services,
    created_at: Date.now(),
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error');
    return true;
  });
  return res.redirect('/instructors');
};

exports.edit = (req, res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return instructor.id === +id;
  });

  const instructor = {
    ...foundInstructor,
    birth: getBirth(foundInstructor.birth),
  };

  if (!foundInstructor) return res.send('Instructor not found!');

  return res.render('instructors/edit', { instructor });
};

exports.put = (req, res) => {
  const { id } = req.body;

  let index = 0;
  const foundInstructor = data.instructors.find((instructor, foundIndex) => {
    index = foundIndex;
    return instructor.id === +id;
  });

  if (!foundInstructor) return res.send('Instructor not found!');

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: +id,
  };

  data.instructors[index] = instructor;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error');
    return true;
  });
  return res.status(200).redirect(`/instructors/${id}`);
};

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredInstructors = data.instructors.filter((instructor) => {
    return instructor.id !== +id;
  });

  data.instructors = filteredInstructors;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error');
    return true;
  });

  return res.status(200).redirect('/instructors/');
};
