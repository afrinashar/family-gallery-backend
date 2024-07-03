// routes/photoRoutes.js
const express = require('express');
const router = express.Router();
const Photo = require('../models/photo');
const upload = require('../app');
// Create a new photo
 

 //.route('/post').post(upload.single('photo'), async(req,res)=>{
    router.post('/post', async(req, res) => {
  try {
    const { title, description } = req.body;
    const imagePath = req.file.path;
    console.log(imagePath,"path")
    const newPhoto = new Photo({ title, description, imagePath });
    await newPhoto.save();
    console.log(req.file, req.body)
    res.status(201).json(newPhoto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all photos
router.get('/get', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a photo
router.put('update/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    res.json(updatedPhoto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a photo
router.delete('delete/:id', async (req, res) => {
  try {
    await Photo.findByIdAndRemove(req.params.id);
    res.json({ message: 'Photo deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
