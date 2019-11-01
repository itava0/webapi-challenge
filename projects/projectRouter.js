const express = require("express");
const router = express.Router();
const db = require("../data/helpers/projectModel");

//Add new project into the database
router.post("/", (req, res) => {
  const project = req.body;
  if (!project.name || !project.description) {
    return res
      .status(400)
      .json({ message: "Please provide a name and description" });
  }
  db.insert(project)
    .then(data => res.status(201).json(project))
    .catch(err => {
      res.status(500).json({
        message: "There was an error while saving the project to the database."
      });
    });
});

//Gets all the projects in the database
router.get("/", (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the projects" });
    });
});

//Gets individual project in the databse
router.get("/:id", (req, res) => {
  const id = req.params.id
  db.get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the project" });
    });
});

//Gets all the project actions in the database
router.get("/:id/actions", (req, res) => {
  const id = req.params.id;

  db.getProjectActions(id)
    .then(action => {
      if (action) {
        res.status(201).json(action);
      } else {
        res
          .status(404)
          .json({
            message: "The project with the specified ID does not exist."
          });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving the project actions" });
    });
});

//Delete project from the database
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(project => {
      res.status(200).json({ message: "project deleted." });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The project with the specified ID does not exist." });
    });
});

//Update existing project in the database
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const project = req.body;

  db.update(id, project)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating the project" });
    });
});

module.exports = router;