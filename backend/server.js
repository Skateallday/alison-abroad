import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Import Routes
import imageRouter from './routes/images.js';
import usersRouter from './routes/users.js';

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'images')));

// Use Routes
app.use('/users', usersRouter);
app.use('/images', imageRouter);

// Middleware for handling client-side routing (MUST be before app.listen)
app.get('*', (req, res) => {
  res.type('text/html'); // Set the MIME type explicitly
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
