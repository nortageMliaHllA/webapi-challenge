const express = require('express');
const projectModel = require('../data/helpers/projectModel');


const router = express.Router();

router.get('/', (req, res) => {
    projectModel.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: 'Project info could not be retrieved!'
        });
    });
});

router.get('/:id', (req, res) => {
    projectModel.get(req.params.id)
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: 'Project info could not be retrieved!'
        })
    })
})

router.post('/', (req, res) => {
    if (req.body.name.length < 100) {
        projectModel.insert(req.body)
            .then(projects => {
                res.status(200).json(projects);
            })
            .catch(err => {
                res.status(500).json({
                    err:err,
                    message: 'Project info could not be posted!'
            });
        })
    }
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    projectModel.update(id, {name, description, completed})
        .then(isUpdated => {
            if(!isUpdated) {
                res.status(400).json({
                    error: `Post with id ${id} could not be updated`
                })
            } else {
                res.status(200).json(isUpdated)
        }
    })
})

// DELETE /
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    projectModel.remove(id)
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: 'The project could not be deleted.'
        });
    });
});