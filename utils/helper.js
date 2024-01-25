function get_theme(req, res) {
    let { dark_mode } = req.cookies

    if (dark_mode === undefined) {
        dark_mode = true
        res.cookie('dark_mode', dark_mode, {});
    }

    return dark_mode
}

function render_page(req, res, page, title, active) {
    let theme = get_theme(req, res) ? 'night' : 'winter'
    res.render('layout', { theme: theme, title: title, content: page, active: active })
}

function readFilePromise(path) {
    return new Promise((resolve) => {
        const fs = require('fs')
        fs.readFile(path, (err, data) => {
            if (err) throw err;
            resolve(data.toString());
        });
    });
}

module.exports = {
    get_theme,
    render_page,
    readFilePromise
}