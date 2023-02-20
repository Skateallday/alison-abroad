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


module.exports = router;