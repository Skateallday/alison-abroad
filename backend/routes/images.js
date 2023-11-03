const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

let path = require('path');
let Image = require('../models/images.models');

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
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(upload.array('src'), (req, res) => {
  const { width, height, country, subregion, caption } = req.body;
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
  });  Image.insertMany(newImages)
    .then(() => res.json('Images added!'))
    .catch(err => res.status(400).json({ error: err.message }));
});


router.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../images', filename);
  res.sendFile(filepath);
});

router.put('/:id', async (req, res) => {
  console.log('PUT request to /images/:id received');

  try {
    const id = req.params.id.trim(); // Get the image ID from the request parameters

    // Use the `Image` model to update the image with the specified ID using the data from the request body
    const updatedImage = await Image.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    return res.json({ message: 'Image updated successfully', updatedImage });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error... ask Marc for help' });
  }
});

router.delete('/:id', async (req, res) => {
  console.log('Delete request to /images/:id received');

  try {
    const id = req.params.id.trim(); // Get the image ID from the request parameters

    // Use the `Image` model to delete the image with the specified ID from the database
    const deletedItem = await Image.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Image not found' });
    }

    return res.json({ message: 'Image deleted successfully', deletedItem });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error... ask Marc for help' });
  }
});

module.exports = router;