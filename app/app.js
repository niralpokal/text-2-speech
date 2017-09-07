const express = require('express');
const app = express();


app.use(express.static('../public/'));

app.get('/', (req, res)=>{
    res.send();
})

if(!require.main.loaded){
  const port = process.env.PORT || 8080;
  app.listen(port, function(){});
}


module.exports = app;