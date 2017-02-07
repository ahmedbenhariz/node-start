var l=require('./amodule');
var fs = require('fs');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var files;

magic=l.magic;

fs.readdir('.',function(err,data){
  files = data;
})
//app.use(express.logger());
app.use(express.static(__dirname +'/public'));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.set('views', __dirname + '/views');

app.get('/jade', function(req, res){
  res.render('starting.jade', {magic: magic[1]});
});

app.get('/ejs', function(req, res){
  res.render('first.ejs', {magic: magic[0]});
});
app.get('/cllfst.png', function(req,res){
  res.send("not here");
});
app.post('/wow',function(req,res){
res.send("done " + req.body.v);

});
app.get('/:id',function(req, res){
  res.send(l.lol + " you id:" + req.params.id);
});
app.get('/',function(req, res){
  res.send(l.lol + " you id:");
});
var server = http.createServer(function(request,response){
  response.writeHead(200, {"Content-Type":"text/plain"});
  response.end("hello");
});

server.listen(8888);
app.listen(8880);

console.log('server be like: run forest run...');
