import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import userRoutes from './routes/users.js';
import roleRoutes from './routes/roles.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

// MongoDB Connection
const MONGODB_URI = "mongodb+srv://gouravmaurya:12345@cluster0.cmfjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit if connection fails
  });


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});