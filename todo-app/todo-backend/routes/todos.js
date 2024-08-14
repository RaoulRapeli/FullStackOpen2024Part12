const express = require('express');
const { Todo } = require('../mongo')
const { setAsync, getAsync } = require('../redis/index')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  let addedTodos = await getAsync('added_todos')
  if(!addedTodos){
    addedTodos = 1
  }
  else{
    addedTodos = parseInt(addedTodos) + 1
  }
  console.log('addedTodos',addedTodos)
  await setAsync('added_todos', addedTodos)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const { todo } = req
  res.send(todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { todo, body } = req
  console.log(todo)
  console.log(body)
  const savedTodo = await Todo.findByIdAndUpdate(todo.id, body, { new: true })
  res.json(savedTodo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
