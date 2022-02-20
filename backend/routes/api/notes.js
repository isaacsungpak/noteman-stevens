const express = require('express')
const asyncHandler = require('express-async-handler');
const { Op } = require("sequelize");

const db = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');

const validateNoteTitle = [
    check('title')
    .isLength({ max: 50 })
    .withMessage("Title length cannot exceed 50 characters."),
    handleValidationErrors
];

// get notes matching search key if provided, else all notes
router.get('/', requireAuth, asyncHandler(async(req, res, next) => {
    const userId = req.user.id;
    let notes;
    let searchKey = req.query.search;

    if (searchKey) {
        notes = await db.Note.findAll({
            where: {
                    userId,
                    [Op.or]: [
                        {title: {[Op.iLike]: `%${searchKey}%`}},
                        {content: {[Op.iLike]: `%${searchKey}%`}}
                    ]
            },
            include: db.Notebook
        });
    }
    else notes = await db.Note.findAll({ where: { userId }, include: db.Notebook });

    return res.json({ notes });
}));

// get notes by search
router.get('/', requireAuth, asyncHandler(async(req, res, next) => {
    const userId = req.user.id;

    const notes = await db.Note.findAll({ where: { userId }, include: db.Notebook });
    return res.json({ notes });
}));

// create note
router.post('/', requireAuth, validateNoteTitle, asyncHandler(async(req, res, next) => {
    const userId = req.user.id;
    const {title, content, notebookId} = req.body;

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

    const note = await db.Note.create({ title, content, userId, notebookId });
    await notebook.update({updatedAt: new Date()});

    return res.json({ note });
}));

// edit note
router.patch('/:noteId(\\d+)', requireAuth, validateNoteTitle, asyncHandler(async(req, res, next) => {
    const userId = req.user.id;
    const { noteId } = req.params;
    const {title, content} = req.body;

    const note = await db.Note.findByPk(noteId);
    const notebookId = note.notebookId;
    if (!note) {
        const err = new Error('Note does not exist');
        err.status = 404;
        err.title = 'Note does not exist';
        err.errors = ['Note does not exist'];
        return next(err);
    } if (userId !== note.userId) {
        const err = new Error('User does not have necessary permissions');
        err.status = 403;
        err.title = 'User does not have necessary permissions';
        err.errors = ['User does not have necessary permissions'];
        return next(err);
    }

    await note.update({title, content, updatedAt: new Date()});

    const notebook = await db.Notebook.findByPk(notebookId);
    await notebook.update({updatedAt: new Date()});

    return res.json({ note });
}));

// delete note
router.delete('/:noteId(\\d+)', requireAuth, asyncHandler(async(req, res, next) => {
    const userId = req.user.id;
    const { noteId } = req.params;

    const note = await db.Note.findByPk(noteId);
    if (!note) {
        const err = new Error('Note does not exist');
        err.status = 404;
        err.title = 'Note does not exist';
        err.errors = ['Note does not exist'];
        return next(err);
    } else if (userId !== note.userId) {
        const err = new Error('User does not have necessary permissions');
        err.status = 403;
        err.title = 'User does not have necessary permissions';
        err.errors = ['User does not have necessary permissions'];
        return next(err);
    }

    const notebookId = note.notebookId;
    const notebook = await db.Notebook.findByPk(notebookId);
    await note.destroy();
    await notebook.update({updatedAt: new Date()});

    return res.json({ noteId });
}));

module.exports = router;
