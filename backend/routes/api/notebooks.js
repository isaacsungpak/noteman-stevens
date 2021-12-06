const express = require('express')
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.post('/', asyncHandler(async (req, res, next) => {
    const { userId } = req.body;

    const user = await db.User.findByPk(userId)

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

router.delete(`/:notebookId(\d+)`, asyncHandler(async (req, res, next) => {
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

    const notebooks = db.Notebook.findAll({ where: { userId } });
    return res.json({
        notebooks
    });
}));


module.exports = router;
