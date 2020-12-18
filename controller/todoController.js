import jwt from 'jsonwebtoken';
import Todo from '../model/todoModel.js';
import Auth from '../model/authModel.js';

const authUserId = (token) => {
  const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decoded._id;
  return userId;
};

export const addTodo = async (req, res) => {
  const user = await Auth.findById({ _id: authUserId(req.headers.token) });
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    user: user.id,
  });

  try {
    const data = await todo.save();
    res.json(data);
  } catch (error) {
    res.send(error.message);
  }
};

export const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: authUserId(req.headers.token) });

  try {
    res.json(todos);
  } catch (error) {
    res.send(error.message);
  }
};

export const getTodo = (req, res) => {};

export const updateTodo = (req, res) => {};

export const deleteTodo = (req, res) => {};
