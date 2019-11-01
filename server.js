const express = require('express');
const helmet = require('helmet');
const projectRouter = require('./projects/projectRouter');
const actionsRouter = require('./actions/actionsRouter');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(logger);
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionsRouter);

//custom middleware
function logger(req, res, next) {
  console.log(` [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
  next();
};

server.get('/', (req, res) => {
  res.send(`<h2>We're Live!</h2>`)
});

module.exports = server;