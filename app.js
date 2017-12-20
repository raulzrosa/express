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

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

/*app.get('/*', function(request, response) {
    if(request.url == '/') {
        response.sendFile(__dirname + '/public/index.html');
    } else {
        console.log(__dirname + '/public' + request.url);
        response.sendFile(__dirname + '/public' + request.url);
    }
});
A linha de baixo faz a mesma coisa dessa comentada
app.use(express.static('public'));
*/

app.use(express.static('public'));

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center',
}

app.get('/blocks', function(request, response) {
    if (request.query.limit >=0) {
        response.json(Object.keys(blocks).slice(0, request.query.limit));
    } else {
        response.json(Object.keys(blocks));
    }
});

app.get('/blocks/:name', function(request, response) {
    var block = request.params.name;
    var description = blocks[block];
    if(!description) {
        response.status(404).json('No description found for ' + request.params.name)
    } else {
        response.json(description);
    }
});

app.post('/blocks', parseUrlencoded, function(request, response) {
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;

    response.status(201).json(newBlock.name);
    console.log(request.body);
});

app.listen(3000);
