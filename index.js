require('dotenv').config();

const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    router = require('./app/routes'),
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(session({
    secret: process.env.SECRET,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(router);

mongoose.connect(process.env.DB_URI);

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
