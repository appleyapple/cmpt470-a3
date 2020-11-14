// if doesnt update, go to localhost:8080/script.js and refresh

// Server url
var url = 'http://localhost:3000/rectangles';

// Loading icon
var loading = document.getElementById('loading');

// Drawing order
var byArea = false; // Draws in order of ID by default

function add() {
    // Cancels default form submission 
    event.preventDefault();
    console.log('Adding to DB...')

    // Collect data from form
    var data = {};
    data['width'] = document.getElementById('new-width').value;
    data['height'] = document.getElementById('new-height').value;
    data['color'] = document.getElementById('new-color').value;

    // Construct http request
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', url, true);
    // xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // // Send form data as json
    // xhr.send(JSON.stringify(data));
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then((out) => {
        console.log(out);
        console.log('...added to DB!');
    })
    .catch(err => {
        throw err;
    });
};

function update() {
    // Cancels default form submission 
    event.preventDefault();
    console.log('Updating DB...')

    // Collect data from form
    var data = {};
    data['id'] = document.getElementById('update-id').value;
    data['width'] = document.getElementById('update-width').value;
    data['height'] = document.getElementById('update-height').value;
    data['color'] = document.getElementById('update-color').value;

    // Send http request
    var updateURL = url.concat('/', data['id']);

    fetch(updateURL, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then((out) => {
        console.log(out);
        console.log('updated DB!')
    })
    .catch(err => {
        throw err;
    });
};

function deleteAll() {
    fetch(url, {method: 'delete'})
    console.log('Deleted all entries in db!')
};

function draw() {
    console.log('Drawing rectangles...');
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            console.log(out);
            drawdraw(out);
            console.log('...done drawing rectangles!')
        })
        .catch(err => {
            throw err
        });
};

function drawdraw(rectangles) {
    // rectangles = [ {id, width, height, color}, {}, {}, ... ]

    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var y = 5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStlye = '#000000';
    ctx.strokeRect(0, 0, 1000, 1000);

    if (byArea) {
        rectangles.sort(function(a, b) {
            return parseInt(a.width*a.height, 10) - parseInt(b.width*b.height);
        });
    }

    for (var i=0; i<rectangles.length; i++) {
        var rect = rectangles[i]

        ctx.fillStyle = '#000000';
        ctx.font = '16px arial';
        ctx.fillText('ID: ' + rect.id, 5, y + 16);

        ctx.fillStyle = rect.color;
        ctx.fillRect(70, y + 3, rect.width, rect.height);
        y += ((rect.height < 20) ? 25 : rect.height + 5);
    }
};

function displayDB() {
    console.log('Displaying rectangle information...')
    fetch(url)
    .then(res => res.json())
    .then((out) => {
        console.log(out);
        drawDB(out);
        console.log('...rectangle information displayed!')
    })
    .catch(err => {
        throw err
    });
}

function drawDB(rectangles) {
    // rectangles = [ {id, width, height, color}, {}, {}, ... ]

    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var y = 5;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStlye = '#000000';
    ctx.strokeRect(0, 0, 1000, 1000);

    if (byArea) {
        rectangles.sort(function(a, b) {
            return parseInt(a.width*a.height, 10) - parseInt(b.width*b.height);
        });
    }

    for (var i=0; i<rectangles.length; i++) {
        var rect = rectangles[i]

        ctx.fillStyle = '#000000';
        ctx.font = '16px arial';
        ctx.fillText('ID: ' + rect.id + ', width: ' + rect.width + ', height: ' + rect.height + ', color: ' + rect.color, 5, y + 16);
        y += 25
    }
};

function checkSort() {
    if (document.getElementById('sortByArea').checked) {
        byArea = true;
    } else {
        byArea = false;
    }
};
