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

router.route('/add').post(upload.single('src'), (req, res, error) => {
  console.log('multer middleware executed');
  console.log(' this is the rejected field ->', error.field);
  console.log(req.file); // Check if the file is being uploaded

  const src = req.body.src;
  const width = Number(req.body.width);
  const height = Number(req.body.height);
  const country = req.body.country;
  const subregion = req.body.subregion;
  const caption = req.body.caption;

  const newImage = new Image({
    src,
    width,
    height,
    country,
    subregion,
    caption,
  });

  newImage
    .save()
    .then(() => res.json('Image added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Image.findById(req.params.id)
    .then(image => res.json(image))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Image.findByIdAndDelete(req.params.id)
    .then(() => res.json('Image deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Image.findById(req.params.id)
    .then(image => {
      image.username = req.body.username;
      image.description = req.body.description;
      image.duration = Number(req.body.duration);
      image.date = Date.parse(req.body.date);

      image
        .save()
        .then(() => res.json('Image updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;