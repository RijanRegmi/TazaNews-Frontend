const expross = require('express');
const prodcutController = require('../controller/productController');
const upload = require('../middleware/imageUpload');

const router = expross.Router();

router.post('/', upload.single('productimage'), prodcutController.createProduct);
router.get('/', prodcutController.getAllProducts);
router.get('/:id', prodcutController.getAllProducts);
router.get('/:id', upload.single('productimage').prodcutController.updateProduct);
router.get('/:id', prodcutController.deleteProducts);

module.exports = router;

