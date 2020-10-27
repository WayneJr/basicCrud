const express       = require('express'),
      router        = express.Router(),
      catController = require('../controllers/categoryController');

router.get('/', catController.root);
router.get('/new', catController.new);
router.post('/', catController.createCategory);

module.exports = router;
