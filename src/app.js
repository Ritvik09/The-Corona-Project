const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')

const MongoClient = mongodb.MongoClient;
const databaseName = 'responses'

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/' ,(req, res) => {
    res.render('index')
})

app.get('/stats' ,(req, res) => {
    res.render('stats')
})

app.get('/news' ,(req, res) => {
    res.render('news')
})

app.get('/helpline' ,(req, res) => {
    res.render('helpline')
})

app.get('/contact' ,(req, res) => {
    res.render('contact')
})

app.post('/post-feedback', function (req, res) {
    MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (error, client)=>{
        if(error)
            return console.log('Unable to connect');
        const db = client.db(databaseName);
        db.collection('sub').insertOne(req.body, (error, result)=>{
            if(error)
                return console.log('Unable to insert');
            console.log(result.ops);
        })
    })
        res.send('Data received:\n' + JSON.stringify(req.body));
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})