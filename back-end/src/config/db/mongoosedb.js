require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_MONGGO_URL)
.then(() => console.log('Connected to database successfully'))
.catch((err) => console.log('Error connecting to database ', err));

module.exports = mongoose;