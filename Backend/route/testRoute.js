const express = require('express')

const rout = express.Router();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database/db');
const testRoutes = require('./routes/testRoute');

const testController = require('../controllers/testController')

router.post('/create_test', testController.createTest);
router.get('/show_test', testController.getTest);

module.exports = router;
