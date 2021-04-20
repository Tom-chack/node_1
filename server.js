const express = require('express');
const app = express();


app.get('/', function (req, res) {
    res.send('Hello Dev!');
});

app.listen(8007, function () {
    console.log('Dev app listening on port 8007!');
});