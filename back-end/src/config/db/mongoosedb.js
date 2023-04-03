const mongoose = require('mongoose');
const urlDb = 'mongodb://127.0.0.1:27017/shopbaoho';

mongoose.connect(urlDb)
.then(() => console.log('Connected to database successfully'))
.catch((err) => console.log('Error connecting to database ', err));

module.exports = mongoose;