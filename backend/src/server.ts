import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';
import { startNewsIngestion } from './jobs/newsIngestion';

dotenv.config();

// Connect to Database
connectDB();

// Start Background Jobs
startNewsIngestion();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
