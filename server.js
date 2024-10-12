const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes'); 

const DB_URL = "mongodb+srv://willbluemoon99:EmCK6UKBZx7vVQJm@ryan.nz0hm.mongodb.net/yourActualDatabaseName?retryWrites=true&w=majority&appName=Ryan"; // Replace with your actual database name
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Successfully connected to the MongoDB Atlas server');
})
.catch(err => {
    console.error('Database connection error:', err);
    process.exit();
});

// Simple route for testing
app.get('/', async (req, res) => {
    res.send("<h1>Welcome to Note Taking Application - Week06 Exercise</h1>");
});

// Use the NoteRoutes
noteRoutes(app);

// Start the server
app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
