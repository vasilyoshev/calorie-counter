const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const configDb = require('./server/config/database');

const app = express();
const port = process.env.PORT || 8080;
const users = require('./server/routes/users');

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

app.use('/users', users);

// Connect to Database
mongoose.connect(configDb.database);
// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + configDb.database);
});
// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// Serves static files from FE build
app.use(express.static(path.join(__dirname, 'dist')));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./server/config/passport')(passport);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

// Start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});