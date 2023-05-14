const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;
const cors = require('cors');
const env = require('dotenv');
env.config();

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register')
const profileRouter = require('./routes/api/auth')
const activityRouter = require('./routes/activity')
const dashRouter = require('./routes/dashboardData')
const userRouter = require('./routes/users')

app.use(cors());

// Connect to MongoDB database
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log('Error connecting to database', err);
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the Vite app
app.use(express.static(path.join(__dirname, '../../dist')));

// Routes
app.use('/api', loginRouter);
app.use('/api', registerRouter);
app.use('/api', profileRouter);
app.use('/api', activityRouter);
app.use('/api', dashRouter);
app.use('/api', userRouter);

// The "catchall" handler: for any request that doesn't match one above, send back Vite's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});