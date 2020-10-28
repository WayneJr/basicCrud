const express       = require('express'),
      router        = express.Router(),
      authEndpoint  = require('../middleware/auth'),
      catController = require('../controllers/categoryController');

router.get('/', catController.root);
router.get('/new', catController.new);
router.post('/', catController.createCategory);
router.get('/:id', catController.show);
router.get('/:id/edit', catController.edit);
router.put('/:id', catController.update);
router.delete('/:id', catController.delete);

module.exports = router;
