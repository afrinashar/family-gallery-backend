/* eslint-disable no-undef */
// controllers/imageController.js
const Image = require('../models/Image');

const imageController = {
  getAllImages: async (req, res) => {
    try {
      const { searchTerm, page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;

      const query = {};
      if (searchTerm) {
        query.name = { $regex: searchTerm, $options: 'i' }; // Case insensitive search
      }
    
      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 },
      };
    
      const photos = await Image.paginate(query, options);
      res.json(photos);
    } catch (error) {
      res.status(400).json('Error: ' + error);
    }
  },
  getImagesById: async (req, res) => {
    try {
      const images = await Image.findById();
      res.json(images);
    } catch (err) {
   //   req.flash('error_msg', 'Server Error');
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
  createImage: async (req, res) => {
   const { name, description } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;
//const {image}=req.file.imageUrl
    try {
// if(!image){
// res.status(400).send('image required')
// }


  const newPhoto = new Image({
    name,
    description,
    imageUrl,
  });

       await newPhoto.save();
      res.json(newPhoto);
     // req.flash('success_msg', 'Image uploaded successfully');
    } catch (err) {
     // req.flash('error_msg', 'Server Error');
      console.error(err);
      res.status(500).send('Server Error');
    } 
  },

  updateImage: async (req, res) => {
    const { name, description } = req.body;

    try {
      const updatedImage = await Image.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
      res.json(updatedImage);
  //    req.flash('success_msg', 'Image updated successfully');
    } catch (err) {
   //   req.flash('error_msg', 'Server Error');
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  deleteImage: async (req, res) => {
    try {
      await Image.findByIdAndRemove(req.params.id);
      res.json({ msg: 'Image removed' });
   //   req.flash('success_msg', 'Image removed successfully');
    } catch (err) {
   //   req.flash('error_msg', 'Server Error');
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = imageController;
