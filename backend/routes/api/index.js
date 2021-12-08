const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const notebooksRouter = require('./notebooks.js');
const notesRouter = require('./notes');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/notebooks', notebooksRouter);
router.use('/notes', notesRouter);

module.exports = router;
