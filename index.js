const express = require('express')
const app = express()

var cookieParser = require('cookie-parser')
app.use(cookieParser());

app.set('view engine', 'ejs')

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

function get_theme(req, res) {
    let { dark_mode } = req.cookies

    if (dark_mode === undefined) {
        dark_mode = true
        res.cookie('dark_mode', dark_mode, {});
    }

    return dark_mode
}

// -------------- routes -------------- //
const games = require('./routes/games.js')
app.use(games);

app.get('/', (req, res) => {
    let theme = get_theme(req, res) ? 'night' : 'winter'
    res.render('index', { theme: theme })
})

app.get('/contact', (req, res) => {
    res.render('contact')
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