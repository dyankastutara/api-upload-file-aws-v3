const router = require('express').Router();
const controller = require('../controllers/upload');
const {upload} = require('../helpers/upload');

router.post('/', upload.single('single-file'), controller.createOne);
router.post('/multiple', upload.any(), controller.createMultiple);
router.post('/from-url', controller.createFromUrl);
router.delete('/single', controller.deleteOne);
router.delete('/multiple', controller.deleteMultiple);

module.exports = router
