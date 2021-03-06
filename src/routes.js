const express = require('express');

const routes = express.Router();
const instructors = require('./app/controllers/instructors');
const members = require('./app/controllers/members');

routes.get('/', (req, res) => {
  return res.redirect('/instructors');
});

// Instructors
routes.get('/instructors', instructors.index);
routes.get('/instructors/create', instructors.create);
routes.post('/instructors', instructors.post);
routes.get('/instructors/:id', instructors.show);
routes.get('/instructors/:id/edit', instructors.edit);
routes.put('/instructors', instructors.put);
routes.delete('/instructors', instructors.delete);

// Members
routes.get('/members', members.index);
routes.get('/members/create', members.create);
routes.post('/members', members.post);
routes.get('/members/:id', members.show);
routes.get('/members/:id/edit', members.edit);
routes.put('/members', members.put);
routes.delete('/members', members.delete);

routes.use((req, res) => {
  return res.status(401).send('Page not found');
});

module.exports = routes;
