## start app
navigate to a3 directory and run:
```
nodemon server
```

## db info

test db @ db4free.net:

    host: 'db4free.net',

    user: 'henryyip',

    password: '123123hh',

    database: 'cmpt470'

table: 'rectangles'

attr: id (primary key), width, height, color

CREATE TABLE rectangles ( id SERIAL NOT NULL, width INT(255) NOT NULL, length INT(255) NOT NULL, color VARCHAR(255) NOT NULL, PRIMARY KEY(id) ) ENGINE=InnoDB;

## start client website 
~~navigate to client directory and run:~~
```
~~http-server~~
```

NO LONGER NEEDED, JUST RUN SERVER.JS

## resources

mysql doc: https://www.npmjs.com/package/mysql

CRUD: https://bezkoder.com/node-js-rest-api-express-mysql/

route params: https://expressjs.com/en/guide/routing.html

req api: https://expressjs.com/en/api.html#req
