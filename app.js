//making express available::::::::::::::::::::::::::::::::::::::::::::::::
var express = require('express');
const app = express();
var request = require('request');
//connecting to locahost::::::::::::::::::::::::::::::::::::::::::::::::::
const port = app.listen(3000, ()=>{
    console.log("app is listening to port 3000 sir!");
});

//declaring my secret key::::::::::::::::::::::::::::::::::::::::::::::::
        // live url
        // let url = 'https://api.ravepay.co/v2/kyc/bvn/';

        //developing url::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        let url = 'https://ravesandboxapi.flutterwave.com/v2/kyc/bvn/';
        let secret_key = 'FLWSECK-7e256e58ed1b03574a5fdc7205ed2b0f-X';

//setting engine to ejs::::::::::::::::::::::::::::::::::::::::::::::::::
app.set('view engine', 'ejs');

//middlewares:::
app.use(express.static(__dirname+'/public'));

app.get('/', (req, res) =>{
res.render('index')}) 
