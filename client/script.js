// if doesnt update, go to localhost:8080/script.js and refresh

function add() {

    // Cancels default form submission 
    event.preventDefault();

    // Collect data from form
    var data = {};
    data['width'] = document.getElementById('width').value;
    data['height'] = document.getElementById('height').value;
    data['color'] = document.getElementById('color').value;

    // Construct http request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/rectangles', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send form data as json
    xhr.send(JSON.stringify(data));
    // alert(JSON.stringify(data));
};