const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('../public/'));

app.get('/', (req, res)=>{
    res.send();
})

if(!require.main.loaded){
  var port = process.env.PORT || 8080;
  app.listen(port, function(){});
}


module.exports = app;