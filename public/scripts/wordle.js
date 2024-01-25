async function fetch_words() {
    greens = ["g1", "g2", "g3", "g4", "g5"]
    yellow = ["y11", "y12", "y13", "y14", "y15", "y21", "y22", "y23", "y24", "y25"]
    let url = 'http://localhost:8080/games/wordlewords?';
    for (let i = 0; i < 5; i++) {
        if (greens[i] != "") {
            url += greens[i] + '=' + document.getElementById(greens[i]).value + '&';
        }
    }
    for (let i = 0; i < 10; i++) {
        if (yellow[i] != "") {
            url += yellow[i] + '=' + document.getElementById(yellow[i]).value + '&';
        }
    }
    url += 'gray=' + document.getElementById("gray").value;
    console.log(url)
    const response = await fetch(url)
    console.log(response)
    let result = await response.json();

    let resultHTML = '';
    for (let i = 0; i < result.length; i += 3) {
        resultHTML += '<div class="flex justify-center">'; // Start a new row

        // Create a new column for each word
        for (let j = i; j < i + 3 && j < result.length; j++) {
            resultHTML += `<div class="w-1/3 text-center">${result[j]}</div>`;
        }

        resultHTML += '</div>'; // End the row
    }

    document.getElementById("result").innerHTML = resultHTML;
}

var greenboxes = document.querySelectorAll('.green');
greenboxes.forEach(function (greenbox) {
    greenbox.addEventListener('input', async function () {
        greenbox.value = greenbox.value.toUpperCase();
        if (greenbox.value) {
            greenbox.style.backgroundColor = 'green';
        } else {
            greenbox.style.backgroundColor = '';
        }
    });
});

var yellowboxes = document.querySelectorAll('.yellow');
yellowboxes.forEach(function (yellowbox) {
    yellowbox.addEventListener('input', async function () {
        yellowbox.value = yellowbox.value.toUpperCase();
        if (yellowbox.value) {
            yellowbox.style.backgroundColor = '#ffd700';
        } else {
            yellowbox.style.backgroundColor = '';
        }
    });
});

var graybox = document.querySelector('.gray');
graybox.addEventListener('input', async function () {
    graybox.value = graybox.value.toUpperCase();
    if (graybox.value) {
        graybox.style.backgroundColor = 'gray';
    } else {
        graybox.style.backgroundColor = '';
    }
});