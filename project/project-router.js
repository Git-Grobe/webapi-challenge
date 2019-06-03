const express = require('express');

const Projects = require('../data/helpers/projectModel.js');
const Actions = require("../data/helpers/actionModel.js");

const router = express.Router();



// ** Project ** //

// GET 
router.get('/', async (req, res) => {
    try {
      const project = await Projects.get();
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving the projects',
      });
    }
  });


// GET by ID /:id
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const project = await Projects.get(id);
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({
        message: 'Error retrieving the project',
      });
    }
  });


// POST
router.post('/', async (req, res) => {
    try {
      const project = await Projects.insert(req.body);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({
        message: 'Error adding the project',
      });
    }
});


// PUT 
router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const project = await Projects.update(id, req.body);
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error updating the project',
      });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const count = await Projects.remove(id);
      if (count > 0) {
        res.status(200).json({ message: 'The project has been removed' });
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the project',
      });
    }
});





// ** Action ** //
// this is a sub-route or sub-resource

// GET
router.get('/:id/actions', async (req, res) => {
    const { id } = req.params
    try {
      const actions = await Projects.getProjectActions(id);
  
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json({
        message: 'Error getting the actions for the hub',
      });
    }
});

// GET action by /:id
router.get('/:id/actions/:id', async (req, res) => {
    const { id } = req.params
    try {
      const actions = await Actions.get(id);
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json({
        message: 'Error getting the actions for the hub',
      });
    }
});


// POST
router.post('/:id/actions', async (req, res) => {
    const actionInfo = { ...req.body, project_id: req.params.id };
  
    try {
      const action = await Actions.insert(actionInfo);
      res.status(210).json(action);
    } catch (error) {
      res.status(500).json({
        message: 'Error getting the actions for the project',
      });
    }
});

// DELETE
router.delete('/:id/actions/:id', async (req, res) => {
    const { id } = req.params
    try {
      const count = await Actions.remove(id);
      if (count > 0) {
        res.status(200).json({ message: 'The project has been removed' });
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error removing the project',
      });
    }
});


module.exports = router;
