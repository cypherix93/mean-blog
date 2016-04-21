(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var mainController = require('../controllers/mainController');

    /* GET home page. */
    router.get('/', mainController.index);

    module.exports = router;
})();