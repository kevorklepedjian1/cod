const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://kevork:123@cluster0.khomafv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Task schema and model
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
   
  }
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/task/list', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});

app.post('/task/create', async (req, res) => {
  const { title, description, dueDate, completed } = req.body;
  try {
    const task = new Task({ title, description, dueDate, completed });
    await task.save();
    res.status(201).send('Task created successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});

app.put('/task/update/:id', async (req, res) => {
  const { title, description, dueDate, completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate, completed }, { new: true });
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.send('Task updated successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});

app.delete('/task/delete/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.send('Task deleted successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});
app.patch('/task/toggle-complete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      task.completed = !task.completed;
      await task.save();
      res.json(task);
    }
  } catch (error) {
    res.status(400).json({ error: 'Error toggling task completion' });
  }
});

// Start server
app.listen(3003, () => {
  console.log('Server started on port 3003');
});
