const express = require('express')
const app = express()

app.set('view engine', 'ejs')

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// -------------- routes -------------- //
const games = require('./routes/games.js')
app.use(games);

app.get('/', (req, res) => {
    res.render('index')
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