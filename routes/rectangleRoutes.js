module.exports = app => {
    const rectangles = require('../controllers/rectangleController');

    // Create new rectangle
    app.post('/rectangles', rectangles.create);

    // Retrieve all rectangles
    app.get('/rectangles', rectangles.findAll);

    // Retrieve rectangle by Id
    app.get('/rectangles/:id', rectangles.findOne);

    // Update rectangle by Id
    app.put('/rectangles/:id', rectangles.update);

    // Delete rectangle by Id
    app.delete('/rectangles/:id', rectangles.delete);

    // Delete all rectangles
    app.delete('/rectangles', rectangles.deleteAll);

}