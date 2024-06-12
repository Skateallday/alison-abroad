const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const Image = require('../models/images.models');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

router.route('/').get((req, res) => {
  Image.find()
    .then(images => res.json(images))
    .catch(err => {
      console.error('Error fetching images:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.route('/add').post(upload.array('src'), (req, res) => {
  console.log('POST request to /add received');
  console.log('Request body:', req.body);
  console.log('Files:', req.files);

  const { width, height, country, subregion, caption } = req.body;

  // Validate request data
  if (!width || !height || !country || !subregion || !caption || req.files.length === 0) {
    console.error('Invalid request data:', req.body);
    return res.status(400).json({ error: 'Invalid request data' });
  }

  const images = req.files.map(file => ({ src: file.filename }));

  const newImages = images.map(image => {
    return new Image({
      src: image.src,
      width: width,
      height: height,
      country: country,
      subregion: subregion,
      caption: caption
    });
  });

  Image.insertMany(newImages)
    .then(() => res.json({ message: 'Images added!' }))
    .catch(err => {
      console.error('Error inserting images:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../images', filename);
  res.sendFile(filepath, err => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

router.put('/:id', async (req, res) => {
  console.log('PUT request to /images/:id received');

  try {
    const id = req.params.id.trim();
    const updatedImage = await Image.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    return res.json({ message: 'Image updated successfully', updatedImage });
  } catch (err) {
    console.error('Error updating image:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  console.log('Delete request to /images/:id received');

  try {
    const id = req.params.id.trim();
    const deletedItem = await Image.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Image not found' });
    }

    return res.json({ message: 'Image deleted successfully', deletedItem });
  } catch (err) {
    console.error('Error deleting image:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
