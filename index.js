const express = require('express')
const app = express()

var cookieParser = require('cookie-parser')
app.use(cookieParser());

app.set('view engine', 'ejs')

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const { render_page } = require('./utils/helper.js')

// -------------- routes -------------- //
const games = require('./routes/games.js')
app.use(games);

app.get('/', (req, res) => {
    render_page(req, res, 'index', 'Avni Garg', 'Home')
})

app.get('/contact', (req, res) => {
    render_page(req, res, 'contact', 'Contact', 'Contact')
})

// -------------- listener -------------- //
const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "127.0.0.1",
    function () {
        console.log("Express server started on port 8080");
        console.log("Visit http://localhost:8080 in your browser!");
    }
);