var express = require('express')
var app = express();

//handlebars engine
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());
app.set('port', process.env.PORT || 3000);


//files
var films = ["Star Wars", "007", "Star Trek", "The God Father", "Xi yangyang"];


app.get('/', function(req, res) {
    res.render('home');
})

app.get('/about', function(req, res) {
    var randomFilm = films[Math.floor(Math.random() * films.length)];
    res.render('about', {
        film: randomFilm
    });
})

app.get('/newsletter', function(req, res) {
    res.render('newsletter', {
        csrf: "CRSF token goes here"
    });
})

app.post('/process', function(req, res) {
    if(req.xhr || req.accept('json.html')=='json'){
        console.log(req.xhr)
        res.send({success:true});
    }else{
        res.redirect(303, '/thank-you');
    }
})

//404 page config
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

//500 page config
app.use(function(err, req, res, next) {
    console.log(err)
    res.status(500);
    res.render('500')
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://lcoalhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
})