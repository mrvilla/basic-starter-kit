/**
 * Created by enrique.cantillo on 08.03.18.
 */
var express = require("express");
var app = express();
var browserSync = require('browser-sync');


app.use(function(req, res, next) {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use(express.static("./public"));

function reload() {
    var bs = browserSync.create().init({
        proxy: 'localhost:2999',
        port: 3000,
        notify: true,
        logSnippet: false,
        open: false,
        files: [
            './public/**/*.*'
        ]
    });

    return require('connect-browser-sync')(bs);
}

app.use(reload());
app.listen(2999);

module.exports = app;

