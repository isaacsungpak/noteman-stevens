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

router.get('/', requireAuth, asyncHandler(async(req, res, next) => {
    const userId = req.user.id;

    const notes = db.Notes.findAll({ where: {userId} });
}))

module.exports = router;
