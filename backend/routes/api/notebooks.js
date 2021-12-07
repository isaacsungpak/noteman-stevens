const express = require('express')
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateTitle = [
    check('title')
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title")
    .isLength({ max: 50 })
    .withMessage("Title length cannot exceed 50 characters."),
    handleValidationErrors
];

router.post('/', validateTitle, asyncHandler(async (req, res, next) => {
    const { title, userId } = req.body;

    const exists = await db.Notebook.findOne({ where: { title, userId } });
    if (exists) {
        const err = new Error('Title is not unique');
        err.status = 400;
        err.title = 'Title is not unique';
        err.errors = ['The provided title is already in use by another notebook belonging to this account.'];
        return next(err);
    }

    const notebook = await db.Notebook.create({ title, userId });
    const notebooks = await db.Notebook.findAll({ where: { userId }, include: db.User });

    return res.json({ notebooks });
}));

router.get('/users/:userId(\\d+)', asyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    const user = await db.User.findByPk(userId);

    if (!user) {
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

router.delete(`/:notebookId(\\d+)`, asyncHandler(async (req, res, next) => {
    const { userId } = req.body;
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
