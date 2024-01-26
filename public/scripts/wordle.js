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

var greenboxes = Array.from(document.querySelectorAll('.green'));
greenboxes.forEach(function (greenbox, index) {
    greenbox.addEventListener('input', async function () {
        greenbox.value = greenbox.value.replace(/[^a-zA-Z]/g, '').slice(0, 1).toUpperCase();
        if (greenbox.value) {
            greenbox.classList.add('bg-success');
            const nextGreenbox = greenboxes[index + 1];
            if (nextGreenbox) {
                nextGreenbox.focus();
            }
        } else {
            greenbox.classList.remove('bg-success');
        }
    });

    greenbox.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace' && greenbox.value === '') {
            const previousGreenbox = greenboxes[index - 1];
            if (previousGreenbox) {
                previousGreenbox.value = '';
                previousGreenbox.classList.remove('bg-success');
                previousGreenbox.focus();
            }
        }
    });
});

var yellowboxes = Array.from(document.querySelectorAll('.yellow'));
yellowboxes.forEach(function (yellowbox, index) {
    yellowbox.addEventListener('input', async function () {
        yellowbox.value = yellowbox.value.replace(/[^a-zA-Z]/g, '').slice(0, 1).toUpperCase();
        if (yellowbox.value) {
            yellowbox.classList.add('bg-warning');
            const nextYellowbox = yellowboxes[index + 1];
            if (nextYellowbox) {
                nextYellowbox.focus();
            }
        } else {
            yellowbox.classList.remove('bg-warning');
        }
    });

    yellowbox.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace' && yellowbox.value === '') {
            const previousYellowbox = yellowboxes[index - 1];
            if (previousYellowbox) {
                previousYellowbox.value = '';
                previousYellowbox.classList.remove('bg-warning');
                previousYellowbox.focus();
            }
        }
    });
});

var graybox = document.querySelector('.gray');
graybox.addEventListener('input', async function () {
    graybox.value = graybox.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
    if (graybox.value) {
        graybox.style.backgroundColor = 'gray';
    } else {
        graybox.style.backgroundColor = '';
    }
});

var grayInput = document.getElementById('gray');
grayInput.oninput = function() {
    this.style.width = Math.max(7, ((this.value.length) * 0.55 + 2.45)) + 'rem';
};