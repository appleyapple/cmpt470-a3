const sql = require('./db.js');

// CREDIT: https://bezkoder.com/node-js-rest-api-express-mysql/

// Rectangle constructor
const Rectangle = function(rectangle) {
    this.width = rectangle.width;
    this.height = rectangle.height;
    this.color = rectangle.color;
}

Rectangle.create = (newRectangle, result) => {
    sql.query('INSERT INTO rectangles SET ?', newRectangle, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('Created rectangle: ', { id: res.insertId, ...newRectangle });
        result(null, { id: res.insertId, ...newRectangle });
    });
};

Rectangle.findById = (id, result) => {
    sql.query('SELECT * FROM rectangles WHERE id=?', id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.height) {
            console.log('Found rectangle: ', res[0]);
            result(null, res[0]);
            return;
        }

        // Rectangle with id not found
        result({ kind: 'not_found' }, null);
    });
};

Rectangle.getAll = result => {
    sql.query('SELECT * FROM rectangles', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        console.log('Rectangles: ', res);
        result(null, res);
    });
};

Rectangle.updateById = (id, rectangle, result) => {
    sql.query(
        'UPDATE rectangles SET width=?, height=?, color=? WHERE id=?',
        [rectangle.width, rectangle.height, rectangle.color, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            // Rectangle with id not found
            if (res.affectedRows == 0) {
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('Updated rectangle: ', { id: id, ...rectangle });
            result(null, { id: id, ...rectangle });
        }
    );
};

Rectangle.remove = (id, result) => {
    sql.query(
        'DELETE FROM rectangles WHERE id=?',
        id,
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            // Rectangle with id not found
            if (res.affectedRows == 0) {
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('Deleted rectangle with id: ', id);
            result(null, res);
        });
};

Rectangle.removeAll = result => {
    sql.query('DELETE FROM rectangles', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        console.log('Deleted ${res.affectedRows} rectangles');
        result(null, res);
    });
};

module.exports = Rectangle;
