var mongoose = require('mongoose');

var connectionString='mongodb://localhost/demo'
mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true})
var connection=mongoose.connection
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.on('open', function () {
    console.log('Connected to mongo server...');

    // //trying to get collection names
    // connection.db.listCollections().toArray(function (err, names) {
    //     console.log(names);
    //     module.exports.Collection = names;
    // });

    // //to close connection
    // mongoose.connection.close();

})

// module.exports=db
