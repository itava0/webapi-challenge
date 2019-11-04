const express = require("express");
const router = express.Router();
const db = require("../data/helpers/actionModel");

router.post("/", (req, res) => {
  const actions = req.body;
  if (!actions.project_id || !actions.description || !actions.notes) {
    return res
      .status(400)
      .json({
        message:
          "Please provide a project id of an existing project, description, notes"
      });
  }
  db.insert(actions)
    .then(data => res.status(201).json(actions))
    .catch(err => {
      res.status(500).json({
        message: "There was an error while saving the actions to the database."
      });
    });
});

router.get("/", (req, res) => {
  db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the actions" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id
  db.get(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the actions" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(action => {
      res.status(200).json({ message: "action deleted." });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The action with the specified ID does not exist." });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const action = req.body;

  db.update(id, action)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating the project" });
    });
});

module.exports = router;