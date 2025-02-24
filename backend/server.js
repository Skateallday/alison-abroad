const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://alison-abroad.onrender.com',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true, // Enable sending cookies across origins
}));
app.use(express.json());


const uri = process.env.ATLAS_URI;
if (!uri) {
  console.error('Error: ATLAS_URI environment variable is not set.');
  process.exit(1);
}
mongoose.connect(uri);

const connection = mongoose.connection;
const imageRouter = require('./routes/images');
const usersRouter = require('./routes/users');

app.use(express.static(path.join(__dirname, 'images')));

app.use('/users', usersRouter);
const imageRouter = require('./routes/images');
const usersRouter = require('./routes/users');

app.use('/images', imageRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


