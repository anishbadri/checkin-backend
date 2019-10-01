const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const PORT = 1234
const api = require('./routes/api')
const app = express()
// app.all('/*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
//   });

app.use(cors())

app.use(bodyParser.json())

app.use('/api', api);

app.get('/', function(req, res){
    res.send("From Server");
})


app.listen(PORT, function(){
    console.log("Runnning on PORT " + PORT);
})
