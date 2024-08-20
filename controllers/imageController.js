/* eslint-disable no-undef */
// controllers/imageController.js
const Image = require('../models/Image');

const imageController = {
  getAllImages: async (req, res) => {
    try {
      const { searchTerm, page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc', category } = req.query;

      const query = {};
      if (searchTerm) {
        query.name = { $regex: searchTerm, $options: 'i' }; // Case-insensitive search
      }
      if (category) {
        query.category = category; // Filter by category
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
      const image = await Image.findById(req.params.id); // Use the correct ID from params
      if (!image) {
        return res.status(404).json({ msg: 'Image not found' });
      }
      res.json(image);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  createImage: async (req, res) => {
    const { name, description, category } = req.body; // Destructure category
    const imageUrl = `/uploads/${req.file.filename}`;

    try {
      // Simple validation
      if (!name || !imageUrl || !category) {
        return res.status(400).json({ msg: 'Please provide all required fields' });
      }

      const newPhoto = new Image({
        name,
        description,
        imageUrl,
        category,
      });

      await newPhoto.save();
      res.json(newPhoto);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  updateImage: async (req, res) => {
    const { name, description, category } = req.body; // Also allow category updates

    try {
      const updatedImage = await Image.findByIdAndUpdate(
        req.params.id,
        { name, description, category }, // Update category as well
        { new: true }
      );
      if (!updatedImage) {
        return res.status(404).json({ msg: 'Image not found' });
      }
      res.json(updatedImage);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },

  deleteImage: async (req, res) => {
    try {
      const image = await Image.findByIdAndRemove(req.params.id);
      if (!image) {
        return res.status(404).json({ msg: 'Image not found' });
      }
      res.json({ msg: 'Image removed' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
};

module.exports = imageController;
