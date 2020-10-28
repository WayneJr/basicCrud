const Product        = require('../../models/product'),
      express        = require('express'),
      router         = express.Router(),
      productControl = require('../controllers/productController');

router.get('/', productControl.root);
router.get('/new', productControl.new);
router.post('/', productControl.createProduct);
router.get('/:id', productControl.show);
router.get('/:id/edit', productControl.edit);
router.put('/:id', productControl.update);
router.delete('/:id', productControl.delete);


module.exports = router;
