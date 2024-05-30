const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/todo-app")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const todoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

// Routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    res.send(todo);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    completed: false,
  });
  await newTodo.save();
  res.json(newTodo);
});

// Add console logs to check incoming requests
app.put("/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        completed: req.body.completed,
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.log("Error updating todo:", error);
    res.status(500).send(error);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Todo.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Todo not found" });
    }
    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
