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
  windowsMs: 15 * 60* 1000,
  max: 500,
  message: 'You have exceeded the 5 requests in 15 minutes limit!'
});

const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_URL
];

app.use(cors({
  origin: function (origin, callback){
    if (!origin) return this.callback(null, true);

    if (allowedOrigins.includes(origin)){
      return callback(null, true)
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  methods:['GET', 'POST', 'PUT', 'DELETEs'],
  credentials: true,
}))

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
app.get('/', (req, res) => {
  res.json({ message: 'Alison Abroad API is running' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
