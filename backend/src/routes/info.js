const router = require('express').Router();

const infoMessage = process.env.INFO_MESSAGE || 'Info message is empty or not set.';

router.get('/', function (req, res, next) {
    res.send({message: infoMessage});
    next();
});

module.exports = router;
