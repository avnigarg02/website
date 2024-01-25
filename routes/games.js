const express = require("express");
const games = express.Router();

const path = require('path');
games.use(express.static(path.join(__dirname, 'public')));


// -------------- read files -------------- //
function readFilePromise(path) {
    return new Promise((resolve) => {
        const fs = require('fs')
        fs.readFile(path, (err, data) => {
            if (err) throw err;
            resolve(data.toString());
        });
    });
}

// -------------- functions -------------- //
function filterWords(words, g1, g2, g3, g4, g5, y11, y12, y13, y14, y15, y21, y22, y23, y24, y25, gray) {
    words_filtered = words.filter((word) => {
        if (g1 && word.charAt(0) != g1.toLowerCase()) return false;
        if (g2 && word.charAt(1) != g2.toLowerCase()) return false;
        if (g3 && word.charAt(2) != g3.toLowerCase()) return false;
        if (g4 && word.charAt(3) != g4.toLowerCase()) return false;
        if (g5 && word.charAt(4) != g5.toLowerCase()) return false;
        if (y11 && (!word.includes(y11.toLowerCase()) || word.charAt(0) == y11.toLowerCase())) return false;
        if (y12 && (!word.includes(y12.toLowerCase()) || word.charAt(1) == y12.toLowerCase())) return false;
        if (y13 && (!word.includes(y13.toLowerCase()) || word.charAt(2) == y13.toLowerCase())) return false;
        if (y14 && (!word.includes(y14.toLowerCase()) || word.charAt(3) == y14.toLowerCase())) return false;
        if (y15 && (!word.includes(y15.toLowerCase()) || word.charAt(4) == y15.toLowerCase())) return false;
        if (y21 && (!word.includes(y21.toLowerCase()) || word.charAt(0) == y21.toLowerCase())) return false;
        if (y22 && (!word.includes(y22.toLowerCase()) || word.charAt(1) == y22.toLowerCase())) return false;
        if (y23 && (!word.includes(y23.toLowerCase()) || word.charAt(2) == y23.toLowerCase())) return false;
        if (y24 && (!word.includes(y24.toLowerCase()) || word.charAt(3) == y24.toLowerCase())) return false;
        if (y25 && (!word.includes(y25.toLowerCase()) || word.charAt(4) == y25.toLowerCase())) return false;
        if (gray) {
            for (let i = 0; i < gray.length; i++) {
                if (word.includes(gray.charAt(i).toLowerCase())) return false;
            }
        }
        return true;
    })
    return words_filtered;
}


games.get('/games', (req, res) => {

    res.render('games');

});

games.get('/games/tictactoe', (req, res) => {
    res.render('tictactoe')
})

games.get('/games/madlibs-input', (req, res) => {
    res.render('madlibs-input')
})

games.post('/games/madlibs-output', (req, res) => {
    const r = req.body;

    res.render('madlibs-output', {
        date: r.date,
        name: r.name ? r.name.charAt(0).toUpperCase() + r.name.slice(1).toLowerCase() : '',
        adj1: r.adjective1 ? r.adjective1.toLowerCase() : '',
        emot: r.emotion ? r.emotion.toLowerCase() : '',
        adj2: r.adjective2 ? r.adjective2.toLowerCase() : '',
        verb1: r.verb ? r.verb.toLowerCase() : '',
        food: r.food ? r.food.toLowerCase() : '',
        bev: r.beverage ? r.beverage.toLowerCase() : '',
        adj3: r.adjective3 ? r.adjective3.toLowerCase() : '',
        noun: r.noun ? r.noun.toLowerCase() : '',
        place: r.place,
        bg: r.place ? r.place.toLowerCase().replace(/ /g, '-') : '',
        animal: r.animal ? r.animal.toLowerCase() : '',
        verb2: r.verb2 ? r.verb2.toLowerCase() : '',
        adj4: r.adjective4 ? r.adjective4.toLowerCase() : '',
        color: r.color ? r.color.toLowerCase() : '',
        verb3: r.verb3 ? r.verb3.toLowerCase() : '',
        noun2: r.noun2 ? r.noun2.toLowerCase() : '',
        emot2: r.emotion2 ? r.emotion2.toLowerCase() : ''
    });
})

games.get('/games/wordle', (req, res) => {
    res.render('wordle')
})

games.get('/games/allwords', async (req, res) => {
    const { g1, g2, g3, g4, g5, y11, y12, y13, y14, y15, y21, y22, y23, y24, y25, gray } = req.query;

    let data = await readFilePromise('public/words/full.txt');
    let words = data.split(/\s+/);

    res.json(filterWords(words, g1, g2, g3, g4, g5, y11, y12, y13, y14, y15, y21, y22, y23, y24, y25, gray))
})

games.get('/games/wordlewords', async (req, res) => {
    const { g1, g2, g3, g4, g5, y11, y12, y13, y14, y15, y21, y22, y23, y24, y25, gray } = req.query;

    let data = await readFilePromise('public/words/possible.txt');
    let words = data.split(/\s+/);

    res.json(filterWords(words, g1, g2, g3, g4, g5, y11, y12, y13, y14, y15, y21, y22, y23, y24, y25, gray))
})


module.exports = games;
