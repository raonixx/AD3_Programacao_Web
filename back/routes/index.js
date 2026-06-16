const express = require('express');
const router = express.Router();

router.use('/cursos', require('./cursos'));
router.use('/professores', require('./professores'));

module.exports = router;