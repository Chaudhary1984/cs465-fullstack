var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');  // ← ADD THIS

/* GET home page. */
router.get('/', ctrlMain.home);  // ← CHANGE THIS

/* GET travel page. */
router.get('/travel', ctrlMain.travel);  // ← CHANGE THIS

module.exports = router;