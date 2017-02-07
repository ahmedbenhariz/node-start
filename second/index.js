var l=require('./amodule');
var fs = require('fs');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

magic=l.magic;

app.use(express.static(__dirname +'/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.set('views', __dirname + '/views');

app.get('/cllfst.png', function(req,res){
  res.send("not here");
});

app.get('/addmagic',function(req,res){
res.render('addmagic.jade');
});


app.get('/magics',function(req,res){
res.render('magicList.jade',{item: magic});
});

app.post('/addmagic',function(req,res){
var item=req.body;
magic.push({
  name:item.name,
  status:item.status,
  rank:parseInt(item.rank)
});
res.render("added.jade", {item: item});
});

app.get('/magic/:id',function(req, res){
  var item = magic[req.params.id-1];
  res.render('getmagic.jade',{magic: item});

});

app.get('/',function(req, res){
  res.render('home.jade');
});

app.listen(8880);

console.log('server be like: run forest run...');
