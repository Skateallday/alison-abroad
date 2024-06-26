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
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use(express.static(path.join(__dirname, 'images')));


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);

});

const imageRouter = require('./routes/images');
const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
app.use('/images', imageRouter);


// Middleware for handling client-side routing
app.get('*', (req, res) => {
  res.type('text/html'); // Set the MIME type explicitly
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});