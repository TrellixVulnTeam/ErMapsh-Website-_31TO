//install for nodemon --npm install nodemon --global
const express = require('express');
const path = require('path');
const fs = require('fs');
const { url } = require('inspector');
const port = 8080;
const app = express();
const bodyParser = require('body-parser')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ErMapshEsportAcedamy', {useNewUrlParser: true, useUnifiedTopology: true});

//define mongoose schema
const EsportPlayerSchema = new mongoose.Schema({
    username: String, 
    name: String, 
    email: String, 
    psw: String
  });

//schema into model
const EsportPlayer = mongoose.model('EsportPlayer', EsportPlayerSchema);



//Express specific Stuff & Serving static file
app.use('/static', express.static('static'));
app.use(express.urlencoded());//middlw-ware for post

//pug specific stuff
app.set('view engine', 'pug')//set template engine as pug
app.set(path.join(__dirname, 'views'));


//Ends point
app.get('/', (req, res)=>{
    res.status(200).render('home.pug');
    console.log(req.url)
})

app.get('/contactus', (req, res)=>{
    console.log(req.url)
    res.status(200).render('contact us.pug');
})

app.post('/contactus',(req, res)=>{
    // console.log(req.url)
    // console.log(req.body);
    const MyData = new EsportPlayer(req.body);
    MyData.save().then(()=>{
        // res.send("Your Response has been saved to database");
        res.status(200).render('contact us.pug');
    }).catch(()=>{
        res.status(400).send("Response has not saved")
    })

    // for my satisfaction
    EsportPlayer.find((err, players)=>{
        if (err) return console.error(err);
        console.log(players);
    })
    
})

app.listen(port , ()=>{
    console.log(`your page successfully run on port ${port}`)
})