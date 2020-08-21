var express = require('express')
var bodyParser = require('body-parser')
var cheerio = require('cheerio');
const axios = require("axios");

var app = express()

// create application/json parser
var jsonParser = bodyParser.json();
//perform the post operation
app.post('/api/scrape', jsonParser, async function (req, res) {
//read request body
let strUrl = req.body.url;
//initalize array
var json = { title : "", description : "", image : []};
//fetch the url by using axios and cheerio
const fetchHtmlData = async () => {
       const result = await axios.get(strUrl);
       return cheerio.load(result.data);
     };
// call the function
const $ = await fetchHtmlData();
//read class name
$('#productTitle').filter(function(){
       let data = $(this);
       title = data.text().trim();
       json.title = title;
})
//read description
$('#productDescription p').filter(function(){
       let data = $(this);
       description = data.text().trim();
       json.description = description;
})
//read all images
let arrImages = [];
$("#altImages ul li").each(function(){
   let spanClass = $(this).children('span');
   let strImg = '';
   $(spanClass).filter(function(){
       strImg =  $(this).find("img").attr('src');
       if(strImg && strImg !== 'undefined'){
         arrImages.push(strImg);
       }       
   })    
});
json.image = arrImages;
//send back all result
res.setHeader('Content-Type', 'application/json');
res.end(JSON.stringify(json, null, 2)); 
  
})

const port = process.env.PORT || 3000;

const server = app.listen(port);
module.exports = server;