const router = require('express').Router();
const controller = require('../controllers/upload');
const {upload} = require('../helpers/upload');


router.post('/', upload.single('single-file'), controller.createOne);
router.post('/multiple', upload.any(), controller.createMultiple);

module.exports = router