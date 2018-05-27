const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const configDb = require('./config/database');

const app = express();
const port = process.env.PORT || 8080;
const users = require('./routes/users');

// CORS middleware
// let corsOptions = {
//     origin: 'http://127.0.0.1:4200',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));

// Cookie middleware
app.use(cookieParser());

// Body parser middleware to give Express the ability to read JSON payloads from the HTTP request body
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
app.use(express.static(path.join(__dirname, '../dist')));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});