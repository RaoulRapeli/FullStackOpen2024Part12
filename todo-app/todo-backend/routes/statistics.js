const express = require('express');
const { getAsync } = require('../redis/index')
const router = express.Router();

router.get('/', async (_, res) => {
    let addedTodos = await getAsync('added_todos')
    if(!addedTodos){
        addedTodos = 0
    }
    res.send({
        "added_todos": parseInt(addedTodos)
    });
});

module.exports = router;