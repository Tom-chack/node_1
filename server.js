const db = require('mongoose');
const config = require('./config/');
const User = require('./models/user');
const fs = require('fs');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {

    db.connect(config.link, {useUnifiedTopology:true, useNewUrlParser:true})
        .then(()=>{

            res.set('Content-Type', 'text/html');
            let message = ( req.query.user ) ? req.query.user + ' is updated!' : '';
           
            User.find({})
            .lean()
            .then( results =>{

                let users_html = fs.readFileSync('./public/users.html', {encoding:'utf-8'});
                let user_list = '';

                users_html = users_html.replace(/\{message\}/g, message );

                results.forEach( user => {
                    let user_html = fs.readFileSync('./public/user.html', {encoding:'utf-8'});
                    user_html = user_html.replace(/\{name\}/g, user.name);
                    user_html = user_html.replace(/\{email\}/g, user.email);
                    user_html = user_html.replace(/\{tel\}/g, user.tel);
                    user_html = user_html.replace(/\{id\}/g, user._id);
                    user_list += user_html;
                } );
                
                users_html = users_html.replace('{users}', user_list);
                res.write(users_html);
                res.end();

            }).catch( e => { throw e });

        }).catch( e => { throw e });
});


app.post('/save', function (req, res) {

    db.connect(config.link, {useUnifiedTopology:true, useNewUrlParser:true})
        .then(()=>{

            res.set('Content-Type', 'text/html');
           
            let _id = req.body._id;
            let name = req.body.name;
            let email = req.body.email;
            let tel = req.body.tel;

            User.findByIdAndUpdate(_id, { name:name, email:email, tel:tel})
                .then( result=> {
                    res.redirect('/?m=1&user=' + name);
                })
                .catch( e => { throw e });

        }).catch( e => { throw e });

});

app.listen(80, function () {
    console.log('Dev app listening on port 80!');
});