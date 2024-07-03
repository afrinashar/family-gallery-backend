/* eslint-disable no-undef */
// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/photos', imageController.getAllImages);
router.get('/photos/id', imageController.getImagesById);
router.post('/add', upload.single('image'), imageController.createImage);
router.put('/photos/:id', imageController.updateImage);
router.delete('/photos/:id', imageController.deleteImage);
module.exports = router;
