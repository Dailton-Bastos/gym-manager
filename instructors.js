const fs = require('fs');
const data = require('./data.json');

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

  // eslint-disable-next-line consistent-return
  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send('Write file error');
  });
  return res.redirect('/instructors');
};
