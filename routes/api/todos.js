import { Router } from 'express';
import { check, validationResult } from 'express-validator/check';

import auth from '../../middleware/auth';
import Todo from '../../models/Todo';

const router = Router();

const validations = [
  check('description', 'Description is required')
    .not()
    .isEmpty(),
  check('responsible', 'Responsible is required')
    .not()
    .isEmpty() 
];

const checkTodoAuth = async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.status(404).json({ msg: 'Todo not found' });
  }
  // Check user
  if (todo.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'User not authorized' });
  }
  req.todo = todo;
  next();
};

// @route    POST api/todos
// @desc     Create a todo
// @access   Private
router.post('/', [auth, validations], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { description, responsible, priority, completed } = req.body;
    const newTodo = new Todo({
      description,
      responsible,
      priority,
      completed,
      user: req.user.id
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/todos
// @desc     Get all todos
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ date: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/todos/:id
// @desc     Get todo by ID
// @access   Private
router.get('/:id', [auth, checkTodoAuth], (req, res) => {
  try {
    res.json(req.todo);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/todos/:id
// @desc     Delete a todo
// @access   Private
router.delete('/:id', [auth, checkTodoAuth], async (req, res) => {
  try {
    await req.todo.remove();
    res.json({ msg: 'Todo removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/todos/:id
// @desc     Like a todo
// @access   Private
router.put('/:id', [auth, validations, checkTodoAuth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const todo = req.todo;
    const { description, responsible, priority, completed } = Object.assign(todo, req.body);
    todo.description = description;
    todo.responsible = responsible;
    todo.priority = priority;
    todo.completed = completed;
    todo.date = Date.now();
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;