const express = require('express');
const router = express.Router();
 
const userController = require('./controllers/UserController');

//router.get('/photos', imageController.getAllImages);
//router.get('/photos/:id', imageController.getImagesById);
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/userdata', userController.userData)
//router.delete('/photos/:id', imageController.deleteImage);

module.exports = router;
