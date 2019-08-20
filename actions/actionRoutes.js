const express = require('express');
const actionModel = require('../data/helpers/actionModel');

const router = express.Router();
router.use(express.json());
// GET /
router.get('/', (req, res) => {
    actionModel.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: 'Action info could not be retrieved!'
        });
    });
});

router.get('/:projectId', (req, res) => {
        const projectId = req.params.projectId;
        projectModel.getProjectActions(projectId)
            .then(actionsOfProject => {
                res.status(200).json(actionsOfProject)
            })
            .catch(err => {
                res.status(404).json({ 
                    err:err,
                    message: 'Error!' 
                });

            })
        })

// GET/:ID /
router.get('/:id', (req, res) => {
    const id  = req.params.id;
    actionModel.get(id)
        .then(projectActions => {
          res.status(200).json(projectActions)
        })
        .catch(err => {
            res.status(404).json({
                err:err,
                message: 'Error...'
        });
    });
});

// POST /
router.post('/', (req, res) => {
    const newAction = req.body;
    actionModel.insert(newAction)
        .then(addedAction => {
            res.status(201).json(addedAction)
        })
        .catch(err => {
    res.status(500).json({ 
        err:err,
        message: 'Error!'
        });
    });
});

// PUT/:ID /
router.put('/:id', (req, res) => {
    const id = req.params.id;
    actionModel.update(id, actionUpdate)
        .then(isUpdated => {
            res.status(200).json(isUpdated)
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: `Could Not Update Action at Id ${id}`
        });
    });
});

// DELETE /
router.delete('/:id', (req, res) => {
    const {id} = req.params
    actionModel.remove(id)
    .then((deleteCount) => {
        if (deleteCount) {
             res.status(204).send();
        } else {
             res.status(404).json({ message: 'id could not be retrieved!' });
        }
  })
    .catch(err => {
        res.status(500).json({
            err:err,
            message: `Could not delete action with id ${id}`
            });
        });
    });




module.exports = router;