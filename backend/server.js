const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const ReactDOMServer = require('react-dom/server');
import Login from '../src/components/login/login'; // Import your LoginPage component



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

const imageRouter = require('./routes/images');
const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
app.use('/images', imageRouter);


app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Route for /login with server-side rendering
app.get('/login', (req, res) => {
  // Perform any necessary data fetching or processing here
  const serverRenderedContent = renderLoginPage();

  // Send the fully rendered HTML to the client
  res.send(serverRenderedContent);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);

});