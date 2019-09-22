import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import connectDB from './config/db';
import usersRouter from './routes/api/users';
import authRouter from './routes/api/auth';
import todosRouter from './routes/api/todos';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Enable CORS
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define Routes
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);

// Serve static assets in production
// Set static folder
app.use(express.static('frontend/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});


app.listen(PORT, () => console.log(`Todos Server started on port ${PORT}`));

export default app;