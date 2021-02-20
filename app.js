var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
var bodyParser = require('body-parser');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.argv[2]);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const paramsListURL = [];
    for (let p in req.query) {
        paramsListURL.push({ 'name': p, 'value': req.query[p] })
    };
    let toAdd = {};
    toAdd.listOfParamsURL = paramsListURL
    res.render('showGet', toAdd)
})

app.post('/', (req, res) => {
    let toAdd = {};
    const paramsListURL = [];
    for (let p in req.query) {
        paramsListURL.push({ 'name': p, 'value': req.query[p] })
    };
    toAdd.listOfParamsURL = paramsListURL

    const paramsListJSON = [];
    for (let p in req.body) {
        paramsListJSON.push({ 'name': p, 'value': req.body[p] })
    };
    toAdd.listOfParamsJSON = paramsListJSON;
    res.render('showPost', toAdd)
})

app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function () {
    console.log('Express started on flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});