const express       = require('express'),
      router        = express.Router(),
      authEndpoint  = require('../middleware/auth'),
      catController = require('../controllers/categoryController');

router.get('/', catController.root);
router.get('/new', authEndpoint, catController.new);
router.post('/', authEndpoint, catController.createCategory);
router.get('/:id', catController.show);
router.get('/:id/edit', authEndpoint, catController.edit);
router.put('/:id', authEndpoint, catController.update);
router.delete('/:id', authEndpoint, catController.delete);

module.exports = router;
