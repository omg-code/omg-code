#!/usr/bin/env node
var irc = require('irc');
var express = require('express');

// Not a good place to store state...
var messages = ["First message"];

// IRC bot
var client = new irc.Client('irc.freenode.net', 'makeryintercom', {
    channels: ['#omgtest'],
});

client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
});

client.addListener('message', function (from, to, message) {
  var matcher = /^makery:\s?(.*)/i.exec(message);
  if (matcher !== null) {
    // Should beep, use espeak, something
    console.log("Makery message: ", matcher[1]);

    // Add a timestamp, push to sqlite or a couchdb
    messages.push(matcher[1]);
  }
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});

// Web app
var app = express();
app.get('/', function(req, res){
  // show last several messages
  res.json(messages);
});
app.post('/', function(req, res){
  console.log(req);
});
// How to respond through the web page?

app.listen(8080);
