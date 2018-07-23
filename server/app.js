const express = require('express');
const session = require('express-session');
const helmet = require('helmet')
const FileStore = require('session-file-store')(session);
const mongoose = require('mongoose');
const configDb = require('./config/database');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

require('./models/food');
require('./models/goal');
require('./models/meal');
require('./models/user');
const user = require('./routes/user');
const food = require('./routes/food');

const app = express();
const port = process.env.PORT || 8080;
app.use(helmet());

// CORS middleware
let corsOptions = {
    origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Session middleware
let sessionObj = {
    store: new FileStore({ secret: 'keyboard cat', reapInterval: -1 }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: { maxAge: 1800000 } // 30 minutes
};
// if (app.get('env') === 'production') {
//     sessionObj.cookie.secure = true; // serve secure cookies
// }
app.use(session(sessionObj));

// Body parser middleware to give Express the ability to read JSON payloads from the HTTP request body
app.use(bodyParser.json());

// Compress all routes
app.use(compression());

// Serves static files from FE build
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/user', user);
app.use('/food', food);

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

// app.get('*', (req, res) => {
//     console.log(__dirname);
//     res.sendFile(path.join(__dirname, '../dist/index.html'));
// });

// Start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});