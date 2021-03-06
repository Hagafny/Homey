const classes = require('express').Router();
const handlers = require('./handlers');
const authMiddleware = require('../../middleware/authMiddleware');

classes.use(authMiddleware);

classes.get('/basic/:ids', handlers.getClassesBasic);
classes.get('/', handlers.get);
classes.post('/', handlers.save);
classes.put('/', handlers.edit);
classes.delete('/:id', handlers.remove);

module.exports = classes;
