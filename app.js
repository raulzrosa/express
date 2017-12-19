/*
Aula 1

var express = require('express');
var app = express();

app.get('/', function(request, response) {
    response.write('Hello World');
    response.end();
});

app.get('/blocks', function(request, response) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    //response.json(blocks);
    //301 -> move permanentemente
    response.redirect(301, '/parts');
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});
*/


var express = require('express');
var app = express();

/*
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
});
A linha de baixo faz a mesma coisa dessa comentada
*/

app.use(express.static('public'));

app.get('/blocks', function(request, response) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    if (request.query.limit >=0) {
        response.json(blocks.slice(0, request.query.limit));
    } else {
        response.json(blocks);
    }
});

app.get('/blocks/:name', function(request, response) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    if (request.query.limit >=0) {
        response.json(blocks.slice(0, request.query.limit));
    } else {
        response.json(blocks);
    }
});

app.listen(3000);
