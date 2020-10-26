const express = require('express');
const app = express();
var port = process.env.port || 3000;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let apiRouts = require('./routs.js');

//Configure body parser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());

//Connect to mongoose
const dbpath = 'mongodb://localhost/firstRest';
const option = {useNewUrlParser: true, useUnifiedTopology: true};
const mongo = mongoose.connect(dbpath, option);

mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})


app.use('/api', apiRouts);

app.get('/', (req, res) => {
    res.send('Welcome');
});







app.listen(port,() =>{
    console.log(`Running on port ${port}`);
});