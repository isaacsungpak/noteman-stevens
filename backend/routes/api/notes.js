const express = require('express')
const asyncHandler = require('express-async-handler');

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

router.get('/', requireAuth, asyncHandler(async(req, res, next) => {
    const userId = req.user.id;

    const notes = await db.Note.findAll({ where: { userId }, include: db.Notebook });
    return res.json({ notes });
}));

router.post('/', requireAuth, validateNoteTitle, asyncHandler(async(req, res, next) => {
    const userId = req.user.id;
    const {title, content, notebookId} = req.body;

    const notebook = await db.Notebook.findByPk(notebookId);
    if (!notebook) {
        const err = new Error('Notebook does not exist');
        err.status = 404;
        err.title = 'Notebook does not exist';
        err.errors = ['The requested notebook could not be found.'];
        return next(err);
    } else if (userId !== notebook.userId) {
        const err = new Error('Account does not have necessary permissions');
        err.status = 403;
        err.title = 'Account does not have necessary permissions';
        err.errors = ['The provided account is not the owner of this notebook.'];
        return next(err);
    }

    await db.Note.create({ title, content, userId, notebookId });

    await notebook.update({updatedAt: new Date()});

    const notes = await db.Note.findAll({ where: { userId }, include: db.Notebook });
    return res.json({ notes });
}));

// router.post('/home', requireAuth, validateNoteTitle, asyncHandler(async(req, res, next) => {
//     const userId = req.user.id;
//     const {title, content, notebookId} = req.body;

//     const notebook = await db.Notebook.findByPk(notebookId);
//     if (!notebook) {
//         const err = new Error('Notebook does not exist');
//         err.status = 404;
//         err.title = 'Notebook does not exist';
//         err.errors = ['The requested notebook could not be found.'];
//         return next(err);
//     } else if (userId !== notebook.userId) {
//         const err = new Error('Account does not have necessary permissions');
//         err.status = 403;
//         err.title = 'Account does not have necessary permissions';
//         err.errors = ['The provided account is not the owner of this notebook.'];
//         return next(err);
//     }

//     await db.Note.create({ title, content, userId, notebookId });

//     await notebook.update({updatedAt: new Date()});

//     const notes = await db.Note.findAll({ where: { userId }, include: db.Notebook });
//     return res.json({ notes });
// }));

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
        err.errors = ['The requested note could not be found.'];
        return next(err);
    } if (userId !== note.userId) {
        const err = new Error('Account does not have necessary permissions');
        err.status = 403;
        err.title = 'Account does not have necessary permissions';
        err.errors = ['The provided account is not the owner of this note.'];
        return next(err);
    }

    await note.update({title, content, updatedAt: new Date()});

    const notebook = await db.Notebook.findByPk(notebookId);
    await notebook.update({updatedAt: new Date()});

    // const notes = await db.Note.findAll({ where: { userId }, include: db.Notebook });
    // return res.json({ notes });
    return res.json({});
}));

router.delete('/:noteId(\\d+)', requireAuth, asyncHandler(async(req, res, next) => {
    const userId = req.user.id;
    const { noteId } = req.params;

    const note = await db.Note.findByPk(noteId);
    if (!note) {
        const err = new Error('Note does not exist');
        err.status = 404;
        err.title = 'Note does not exist';
        err.errors = ['The requested note could not be found.'];
        return next(err);
    } else if (userId !== note.userId) {
        const err = new Error('Account does not have necessary permissions');
        err.status = 403;
        err.title = 'Account does not have necessary permissions';
        err.errors = ['The provided account is not the owner of this note.'];
        return next(err);
    }

    const notebookId = note.notebookId;
    const notebook = await db.Notebook.findByPk(notebookId);
    await note.destroy();
    await notebook.update({updatedAt: new Date()});

    const notes = await db.Note.findAll({ where: { userId }, include: db.Notebook });
    return res.json({ notes });
}));

module.exports = router;
