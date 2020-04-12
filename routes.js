const express = require('express');

const routes = express.Router();
const instructors = require('./instructors');

routes.get('/', (req, res) => {
  return res.redirect('/instructors');
});

routes.get('/instructors', (req, res) => {
  return res.render('instructors/index');
});

routes.get('/instructors/create', (req, res) => {
  return res.render('instructors/create');
});

routes.post('/instructors', instructors.post);

routes.get('/instructors/:id', instructors.show);

routes.get('/instructors/:id/edit', instructors.edit);

routes.put('/instructors', instructors.put);

routes.delete('/instructors', instructors.delete);

routes.get('/members', (req, res) => {
  return res.render('members/index');
});

routes.use((req, res) => {
  return res.status(401).send('Page not found');
});

module.exports = routes;
