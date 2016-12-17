var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');


var app = express();

app.use(cors());
// for large payload
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
    app.use(function (req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}
app.use(express.static(path.join(__dirname, '/public')));


/*
 |--------------------------------------------------------------------------
 | Start the Server
 |--------------------------------------------------------------------------
 */

app.set('port', process.env.OPENSHIFT_NODEJS_PORT|| process.env.PORT|| 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP|| '0.0.0.0');
app.listen(app.get('port'), app.get('ip'), function(){
  console.log("Express server on "+app.get('port'));
});