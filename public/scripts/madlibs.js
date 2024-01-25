validateForm = () => {

    var inputs = document.querySelectorAll("input[type=text]")
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            document.querySelector('#error').innerHTML = 'Fill out all the fields!';
            return false
        }
    }

    var checked = document.querySelector('input[name="place"]:checked');
    if (!checked) {
        document.querySelector('#error').innerHTML = 'Make sure to pick a location!';
        return false;
    }

    var date_filled = document.querySelector('input[type=date]').value;
    if (date_filled == "") {
        document.querySelector('#error').innerHTML = 'Fill out the date!';
        return false;
    }

    return true;
}
