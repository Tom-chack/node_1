const db = require('mongoose');
const config = require('./config/');
const User = require('./models/user');

const express = require('express');
const app = express();


app.get('/', function (req, res) {
    res.write('Hello Dev x!');

    db.connect(config.link, {useUnifiedTopology:true, useNewUrlParser:true})
        .then(()=>{
            console.log('Connected to MongoDB!');
           
            User.find({})
            .then( results =>{
                
                results.forEach( rows => {
                    res.write( JSON.stringify(rows) );
                } );
                
                res.send('Done!');

            }).catch( e => { throw e });
            
        }).catch( e => { throw e });

});

app.listen(80, function () {
    console.log('Dev app listening on port 80!');
});