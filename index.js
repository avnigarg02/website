const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use("/css", express.static("./node_modules/bootstrap/dist/css"));
app.use(express.static('public'));

// -------------- routes -------------- //
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/tictactoe', (req, res) => {
    res.render('tictactoe')
})


// -------------- listener -------------- //
const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "127.0.0.1",
    function () {
        console.log("Express server started on port 8080");
        console.log("Visit locolhost:8080 in your browser or 127.0.0.1:8080!")
    }
);