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
        err.title = 'Title is not unique';
        err.errors = ['The provided title is already in use by another notebook belonging to this account.'];
        return next(err);
    }

    await db.Notebook.create({ title, userId });

    const notebooks = await db.Notebook.findAll({ where: { userId }, include: db.User });
    return res.json({ notebooks });
}));

router.get('/user', requireAuth, asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const user = await db.User.findByPk(userId);

    if (!user || Number(userId) !== req.user.id) {
        const err = new Error('Account does not exist');
        err.status = 400;
        err.title = 'Account does not exist';
        err.errors = ['The provided account was invalid.'];
        return next(err);
    }

    const notebooks = await db.Notebook.findAll({ where: { userId: user.id }, include: db.User });
    return res.json({
        notebooks
    });
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
        err.title = 'Title is not unique';
        err.errors = ['The provided title is already in use by another notebook belonging to this account.'];
        return next(err);
    }
    if (userId !== notebook.userId) {
        const err = new Error('Account does not have necessary permissions');
        err.status = 403;
        err.title = 'Account does not have necessary permissions';
        err.errors = ['The provided account is not the owner of this notebook.'];
        return next(err);
    }

    await notebook.set({ title: title, updatedAt: new Date() });
    await notebook.save();

    const notebooks = await db.Notebook.findAll({ where: { userId }, include: db.User });
    return res.json({ notebooks });
}));

router.delete(`/:notebookId(\\d+)`, requireAuth, asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { notebookId } = req.params;

    const notebook = await db.Notebook.findByPk(notebookId);

    if (userId !== notebook.userId) {
        const err = new Error('Account does not have necessary permissions');
        err.status = 403;
        err.title = 'Account does not have necessary permissions';
        err.errors = ['The provided account is not the owner of this notebook.'];
        return next(err);
    }

    await notebook.destroy();

    const notebooks = await db.Notebook.findAll({ where: { userId }, include: db.User });
    return res.json({
        notebooks
    });
}));


module.exports = router;
