const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect("mongodb+srv://mernuser:mern123@cluster0.banl8z5.mongodb.net/?appName=Cluster0", {
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

// 2. Create Todo Schema
const TodoSchema = new mongoose.Schema({ 
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

// 3. GET all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// 4. POST create todo
app.post("/todos", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    completed: false,
  });

  res.json(todo);
});

// 5. PUT update todo
app.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text, completed: req.body.completed },
    { new: true }
  );

  res.json(todo);
});

// 6. DELETE todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

const PORT = process.env.PORT;
// Start server
app.listen(PORT, () => {
  console.log("Backend running on http://localhost:5000");
});
