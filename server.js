const db = require('mongoose');
const config = require('./config/');
const User = require('./models/user');

const express = require('express');
const app = express();


app.get('/', function (req, res) {

    db.connect(config.link, {useUnifiedTopology:true, useNewUrlParser:true})
        .then(()=>{

            res.set('Content-Type', 'text/html');
            res.write('Hello Users!');
            
            console.log('Connected to MongoDB!');
           
            User.find({})
            .lean()
            .then( results =>{

                res.write('<ul>');
                results.forEach( rows => {
                    res.write('<li>' + rows.name + '</li>')
                } );
                res.write('</ul>')
                res.end('Done!');
                
            }).catch( e => { throw e });
            
        }).catch( e => { throw e });

});

app.listen(80, function () {
    console.log('Dev app listening on port 80!');
});