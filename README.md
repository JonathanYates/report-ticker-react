# Report Ticker (React 16 version)

This is a report ticker application using:
 
- Client: React (v16), Redux, Rxjs, Bootstrap. 
- Server: Node, Express 4, Socket.io, MongoDB, Mongoose

Notes
-----

The application displays a tiled list of reports. The server will emit change updates which the React client subscribes to using socket.io. 
Each tile displays the report value and a change (if any). 
The values will update as changes are received and will flash either Green for a positive change or Red for a negative change.
Click on a tile will navigate to the actual report which displays a matrix (grid) of ticking values. 
These will update changed values emitted from the server and will flash accordingly. 
Each report has a random matrix size and change values are emitted randomly.
Click the reports menu option to return the the list of report tiles.

All Code is written using Typescript.

Ticking speed
-------------

You can change the ticking speed in the ticker.service by changing the lowerTick and upperTick variables which are in milliseconds. 
The default is lowerTick = 500ms, upperTick = 1000ms which tick at a sensible speed. 

Prerequisites
-------------

1. Mongodb. Ensure you have default database path created data/db

    https://www.mongodb.org/

2. Node.

    https://nodejs.org/

3. Typescript

    http://www.typescriptlang.org/


Setup
-----

1. npm install

2. 'tsc' to compile Typescript

3. 'mongod' from command line to start the Mongo database

4. 'node create-db.js' to create database of reports

5. cd to server, run 'node server.js' to start node api server

6. cd to client, run 'npm start' to launch React client.







