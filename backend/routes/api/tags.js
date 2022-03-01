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

    const exists = await db.Tag.findOne({ where: { title, userId } });

    if (exists) {
        const err = new Error('Title is not unique');
        err.status = 400;
        err.title = 'Title is already in use';
        err.errors = ['Title is already in use'];
        return next(err);
    }

    const tag = await db.Tag.create({ title, userId });
    return res.json({ tag });
}));

router.get('/', requireAuth, asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const tags = await db.Tag.findAll({ where: { userId }, include: db.User });
    return res.json({ tags });
}));

router.patch('/:tagId(\\d+)', requireAuth, validateTitle, asyncHandler(async (req, res, next) => {
    const { tagId } = req.params;
    const { title } = req.body;
    const userId = req.user.id;

    const tag = await db.Tag.findByPk(tagId);
    const exists = await db.Tag.findOne({ where: { title, userId } });

    if (exists) {
        const err = new Error('Title is not unique');
        err.status = 400;
        err.title = 'Title is already in use';
        err.errors = ['Title is already in use'];
        return next(err);
    } else if (userId !== tag.userId) {
        const err = new Error('User does not have necessary permissions');
        err.status = 403;
        err.title = 'User does not have necessary permissions';
        err.errors = ['User does not have necessary permissions'];
        return next(err);
    }

    await tag.set({ title: title, updatedAt: new Date() });
    await tag.save();

    return res.json({ tag });
}));

router.delete(`/:tagId(\\d+)`, requireAuth, asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { tagId } = req.params;

    const tag = await db.Tag.findByPk(tagId);

    if (userId !== tag.userId) {
        const err = new Error('User does not have necessary permissions');
        err.status = 403;
        err.title = 'User does not have necessary permissions';
        err.errors = ['User does not have necessary permissions'];
        return next(err);
    }

    await tag.destroy();
    return res.json({ tagId });
}));

// get notes by tag
router.get('/:tagId(\\d+)/notes', requireAuth, asyncHandler(async(req, res, next) => {
    const userId = req.user.id;
    const { tagId } = req.params;

    const tag = await db.Tag.findByPk(tagId);
    if (!tag) {
        const err = new Error('Tag does not exist');
        err.status = 404;
        err.title = 'Tag does not exist';
        err.errors = ['Tag does not exist'];
        return next(err);
    } else if (userId !== tag.userId) {
        const err = new Error('User does not have necessary permissions');
        err.status = 403;
        err.title = 'User does not have necessary permissions';
        err.errors = ['User does not have necessary permissions'];
        return next(err);
    }

    const noteTags = await db.NoteTagRelation.findAll({ where: { tagId }, include: db.Note });
    // IMPORTANT: RETURNS NOTETAGS; NOT NOTES -> TO BRING PROCESS DOWN FROM O(3N) TO O(2N)
    return res.json({ noteTags });
}))

module.exports = router;
