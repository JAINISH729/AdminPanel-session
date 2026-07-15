const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/admin-session');

const db = mongoose.connection;

db.once('open',(err) =>{
    if(err){
        console.log(err);
        return false;
    }
    console.log('DATABASE CONNECTION SUCCESFULLY');
});

module.exports = db;