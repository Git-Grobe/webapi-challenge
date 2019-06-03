const express = require('express');

const projectRouter = require('./project/project-router.js');

const server = express();

// Built in middleware
server.use(express.json());


// router
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
  
    res.send(`
      <h2>Lambda API challenge </h2>
      <p>API Challenge!!</p>
      `);
  });
  
  module.exports = server;
