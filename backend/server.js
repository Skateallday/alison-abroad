import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


import usersRouter from './routes/users.js';
import imageRouter from './routes/images.js';

import rateLimit from 'express-rate-limit';



dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('trust proxy', 1); // trust first proxy


const port = process.env.PORT || 5000;
const generalLimiter = rateLimit({
  windowsMS: 15 * 60* 1000,
  max: 500,
  message: 'You have exceeded the 5 requests in 15 minutes limit!'
});

app.use(cors({
  /*origin: 'https://alison-abroad.onrender.com',*/
  origin: 'http://localhost:3000',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true, // Enable sending cookies across origins
}));

app.use(express.json());

const uri = process.env.ATLAS_URI;
if (!uri) {
  console.error('Error: ATLAS_URI environment variable is not set.');
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });



// Serve static files
app.use('/images', generalLimiter, express.static(path.join(__dirname, 'images')));

// Use Routes
app.use('/users', usersRouter);
app.use('/images', imageRouter);

// Middleware for handling client-side routing (MUST be before app.listen)
app.get('*', generalLimiter, (req, res) => {
  res.type('text/html'); // Set the MIME type explicitly
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
