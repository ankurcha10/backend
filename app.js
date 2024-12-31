const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectToDb = require('./db/db');
const cookieParser = require('cookie-parser');
const app = express();
const userRoutes = require('./routes/user.routes');




connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/users', userRoutes);

module.exports = app;