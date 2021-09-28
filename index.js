'use strict'

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const useragent = require('express-useragent');

//Configuring the Express Middleware
var app = express();

app.use(morgan('common'));

//Set PORT to Dynamic Environments to run on any Server
var port = process.env.PORT || 3005;

app.use(cors({
    exposedHeaders : "*"
}));

//Set RESTful routes
app.get('/health', function(req, res) {
  res.send("Server Online");
});
//Route for GET
app.get('/proxy', function (req, res) {
    var glbUrl = req.query.ios;
    var usdzUrl = req.query.android;
    var source = req.headers['user-agent']
    let ua = useragent.parse(source);
    console.log("Platform : ", ua.platform);
    if (ua.platform == 'Android') {
        let redirect_url_android = "intent://arvr.google.com/scene-viewer/1.0?file=" + glbUrl + "&mode=ar_only&resizable=false#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;resizable=false"
        console.log("Will redirect to : ", redirect_url_android)
        res.redirect(redirect_url_android)
    }
    else if (ua.platform == 'iPhone' || ua.platform == 'iPad' || ua.platform == 'iPod') {
        let redirect_url_ios = usdzUrl + "#allowsContentScaling=0"
        console.log("Will redirect to : ", redirect_url_ios)
        res.redirect(redirect_url_ios)
    }
    
})

app.listen(port)
console.log("Server started successfully at PORT : " + port);

