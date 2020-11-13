const Rectangle = require('../models/rectangleModel');

// Create and save a new rectangle
exports.create = (req, res) => {
    // Validate req
    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty'
        });
    }

    // Create rectangle
    const rectangle = new Rectangle({
        width: req.body.width,
        height: req.body.height,
        color: req.body.color
    });

    // Save rectangle to db
    Rectangle.create(rectangle, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Error creating rectangle'
            });
        else res.send(data);
    });
};

// Retrieve all rectangles
exports.findAll = (req, res) => {
    Rectangle.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Error retrieving all rectangles'
            });
        else res.send(data);
    });
};

// Find a single rectangle by Id
exports.findOne = (req, res) => {
    Rectangle.findById(req.params.id, (err, data) => {
        if (err)
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Rectangle with id=' + req.params.id + ' not found'
                });
            } else {
                res.status(500).send({
                    message: err.message || 'Error retrieving rectangle with Id ' + req.params.id
                });
            }
        else res.send(data);
    });
};

// Update a rectangle by Id
exports.update = (req, res) => {
    // Validate req
    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty'
        });
    }

    // Update rectangle
    Rectangle.updateById(req.params.id, new Rectangle(req.body), (err, data) => {
            if (err)
                if (err.kind === 'not_found') {
                    res.status(404).send({
                        message: 'Rectangle with id=' + req.params.id + ' not found'
                    });
                } else {
                    res.status(500).send({
                        message: 'Error update rectangle with Id ' + req.params.id
                    });
                }
            else res.send(data);
        }
    );
};

// Delete a rectangle by Id
exports.delete = (req, res) => {
    Rectangle.remove(req.params.id, (err, data) => {
        if (err)
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: 'Rectangle with id=' + req.params.id + ' not found'
                });
            } else {
                res.status(500).send({
                    message: 'Error deleting rectangle with Id ' + req.params.id
                });
            }
        else res.send({ message: 'Rectangle deleted' })
    })
};

// Delete all rectangles
exports.deleteAll = (req, res) => {
    Rectangle.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: 'Error deleting all rectangles'
            });
        else res.send({ message: 'All rectangles deleted' })
    });
};