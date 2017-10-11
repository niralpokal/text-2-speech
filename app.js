const express = require('express');
const jsonParser = require('body-parser').json();
const app = express();

app.use(express.static('./public/'));

app.get('/', (req, res)=>{
    res.send();
})

app.post('/text', jsonParser, (req, res) =>{
  const body = req.body;
})

if(!require.main.loaded){
  const port = process.env.PORT || 8080;
  app.listen(port, function(){});
}

module.exports = app;