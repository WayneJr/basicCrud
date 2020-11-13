const Product        = require('../../models/product'),
      express        = require('express'),
      router         = express.Router(),
      authEndpoint  = require('../middleware/auth'),
      productControl = require('../controllers/productController');

router.get('/', productControl.root);
router.get('/new', authEndpoint, productControl.new);
router.post('/', authEndpoint, productControl.createProduct);
router.get('/:id', productControl.show);
router.get('/:id/edit', authEndpoint, productControl.edit);
router.put('/:id', authEndpoint, productControl.update);
router.delete('/:id', authEndpoint, productControl.delete);


module.exports = router;
