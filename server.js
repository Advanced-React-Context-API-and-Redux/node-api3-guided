const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const helmet = require('helmet'); // 1 --> npm i helmet 2 --> the require

const hubsRouter = require('./hubs/hubs-router.js');
const logger = require('./common/logger-middleware.js');

const server = express();

// global middleware(applied to every request coming in to the server) - you do it by calling server.use() and pass the middleware as a parameter --> server.use(express.json())
server.use(morgan('dev')); // third party, needs to be npm installed
server.use(logger);
server.use(helmet()); // use the middleware --> execute it 
server.use(express.json()); // built-in middleware: no need to npm install

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  console.log("req.name is:", req.name)

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.use(function(req, res, next){
  res.status(404).json({ error: "Oops, didn't find what you're looking for."})
})

module.exports = server;
