const express = require('express');
const jsonParser = require('body-parser').json();
const MongoClient = require('mongodb').MongoClient();
const app = express();

const mongoUrl = 'mongodb://speech:speech@ds115085.mlab.com:15085/text2speech'

app.use(express.static('./public/'));

app.get('/', (req, res)=>{
    res.send();
})

app.post('/phrase', jsonParser, (req, res) =>{
  const body = req.body;
  MongoClient.connect(mongoUrl)
    .then(db => {
      const collection = db.collection('phrases');
      return collection.insert(body)
              .then(result => db.close()) ;
    })
    .then(result => res.sendStatus(200))
    .catch(err => res.sendStatus(200))
})

if(!require.main.loaded){
  const port = process.env.PORT || 8080;
  app.listen(port, function(){});
}

module.exports = app;