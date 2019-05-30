//making express available::::::::::::::::::::::::::::::::::::::::::::::::
var express = require('express');
const app = express();
var request = require('request');
//connecting to locahost::::::::::::::::::::::::::::::::::::::::::::::::::
const port = app.listen(process.env.port || 3000, ()=>{
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

//requiring formidable and fs::::::::::::::::::::::::::::::::::::::::::::
var fm = require('formidable');
var fs = require('fs');

//creating a method from formidable class::::::::::::::::::::::::::::::
var form = new fm.IncomingForm();

//requiring body-parser::::::::::::::::::::::::::::::::::::::::::::::::::::
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//require mongoose::::::::::::::::::::::::::::::::::::::::::::::::::::::
var mongoose = require('mongoose');

//setting promise::::::::::::::::::::::::::::::::::::::::::::::::::::::::
mongoose.Promise = global.Promise;

//database configuration:::::::::::::::::::::::::::::::::::::::::::::::::
//mongoose.connect("mongodb://localhost:27017/bvn_app");

//index - onload::::::::::::::::::::::::;:::::::::::::::::::::::::::::::::
app.get('/', (req, res)=>{
    res.render('index');
});

//bvn_index::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.get('/bvn', (req,res)=>{
    res.render('index_bvn');
});

//payment_index::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.get('/payment', (req,res)=>{
    res.render('index_payment', {status: null});
});

//problem_solution::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.get('/solution', (req,res)=>{
    res.render('solution_problem');
});

//payment now::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
let company = rider = [];
app.post('/pay', (req,res)=>{
    if(req.body.card_num == "" || req.body.card_cvv == "" || req.body.card_exp == ""){
        res.render('index_payment', {status: 'error'});
    }
    else{
        company.push(5000);
        rider.push(5000);
        company_total = company.length/2 * 5000;
        rider_total = rider.length/2 * 5000;
        res.render('confirm_payment', {rider_total: rider_total, company_total: company_total})
    }     
});

app.get('/process', (req,res)=>{
    res.render('process', { bvn_num: null, status: null })
});

app.post('/validate', (req, res)=>{
    let bvn_input = req.body.bvn_num;
    if(bvn_input==''){
        res.render('process', {status: 'fillform_err', bvn_num: null});
    }
    else{
    
    let dat = url + bvn_input +'?seckey='+secret_key;
    request(dat, function(err, response, body){
        if(err) {
            res.send('Error: connection failed');
        }

        else {
            let mine = JSON.parse(body);
            console.log(mine);
            res.render('result', {bvn: mine.data.bvn, fn: mine.data.first_name, mn: mine.data.middle_name, ln: mine.data.last_name, dob: mine.data.date_of_birth, phone: mine.data.phone_number});
        };
    });
    }
});
