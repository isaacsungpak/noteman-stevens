const express = require('express')
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');

const validateTitle = [
    check('title')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title")
    .isLength({ max: 50 })
    .withMessage("Title length cannot exceed 50 characters."),
    handleValidationErrors
];

router.post('/', requireAuth, validateTitle, asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { title } = req.body;

    const exists = await db.Notebook.findOne({ where: { title, userId } });

    if (exists) {
        const err = new Error('Title is not unique');
        err.status = 400;
        err.title = 'Title is already in use';
        err.errors = ['Title is already in use'];
        return next(err);
    }

    const notebook = await db.Notebook.create({ title, userId });
    return res.json({ notebook });
}));

router.get('/', requireAuth, asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const notebooks = await db.Notebook.findAll({ where: { userId: userId }, include: db.User });
    return res.json({ notebooks });
}));

router.patch('/:notebookId(\\d+)', requireAuth, validateTitle, asyncHandler(async (req, res, next) => {
    const { notebookId } = req.params;
    const { title } = req.body;
    const userId = req.user.id;

    const notebook = await db.Notebook.findByPk(notebookId);

    const exists = await db.Notebook.findOne({ where: { title, userId } });

    if (exists) {
        const err = new Error('Title is not unique');
        err.status = 400;
        err.title = 'Title is already in use';
        err.errors = ['Title is already in use'];
        return next(err);
    } else if (userId !== notebook.userId) {
        const err = new Error('User does not have necessary permissions');
        err.status = 403;
        err.title = 'User does not have necessary permissions';
        err.errors = ['User does not have necessary permissions'];
        return next(err);
    }

    await notebook.set({ title: title, updatedAt: new Date() });
    await notebook.save();

    return res.json({ notebook });
}));

router.delete(`/:notebookId(\\d+)`, requireAuth, asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { notebookId } = req.params;

    const notebook = await db.Notebook.findByPk(notebookId);

    if (userId !== notebook.userId) {
        const err = new Error('User does not have necessary permissions');
        err.status = 403;
        err.title = 'User does not have necessary permissions';
        err.errors = ['User does not have necessary permissions'];
        return next(err);
    }

    await notebook.destroy();

    return res.json({ notebookId });
}));

// get notes in notebook
router.get('/:notebookId(\\d+)/notes', requireAuth, asyncHandler(async(req, res, next) => {
    const userId = req.user.id;
    const {notebookId} = req.params;

    const notebook = await db.Notebook.findByPk(notebookId);
    if (!notebook) {
        const err = new Error('Notebook does not exist');
        err.status = 404;
        err.title = 'Notebook does not exist';
        err.errors = ['Notebook does not exist'];
        return next(err);
    } else if (userId !== notebook.userId) {
        const err = new Error('User does not have necessary permissions');
        err.status = 403;
        err.title = 'User does not have necessary permissions';
        err.errors = ['User does not have necessary permissions'];
        return next(err);
    }

    const notes = await db.Note.findAll({ where: { userId, notebookId }, include: db.Notebook });
    return res.json({ notes });
}))

module.exports = router;
