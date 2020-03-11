const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const helmet = require('helmet'); // 1 --> npm i helmet 2 --> the require

const hubsRouter = require('./hubs/hubs-router.js');
const logger = require('./common/logger-middleware.js');

const server = express();

// global middleware(applied to every request coming in to the server) - you do it by calling server.use() and pass the middleware as a parameter --> server.use(express.json())
server.use(morgan('dev')); // third party, needs to be npm installed
// server.use(logger);
server.use(helmet()); // use the middleware --> execute it 
server.use(express.json()); // built-in middleware: no need to npm install

server.use('/api/hubs', logger, hubsRouter);

// middleware doesn't have to return a value
// middleware must either call next or produce a response

// global use, if it's only for a few routes, we can place it locally
// server.use(addName);

server.get('/', addName, logger, (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  console.log("req.name is:", req.name)

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function addName(req, res, next) {
  // ultra, mega, super, supra, giga secret sauce
  req.name = 'Web 27'

  next();
}

server.use(function(req, res, next){
  res.status(404).json({ error: "Oops, didn't find what you're looking for."})
})

module.exports = server;

// option for how to use  middleware that returns a value and how you have to change the structure.
// function addName(name) {
//   return function(req, res, next ) {
//     req.name= name;

//     next();
//   };
// }
