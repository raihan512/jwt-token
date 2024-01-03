const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// get all todos
router.get("/", async (req, res) => {
  Todo.find({ status: "inactive" })
    .select({
      _id: 0,
      __v: 0,
      date: 0,
    })
    .limit(2)
    .then((data) => {
      res.status(200).json({ message: data });
    })
    .catch();
});

// get a todo by id
router.get("/:id", async (req, res) => {
  await Todo.find({ _id: req.params.id }).then((data) => {
    res.status(200).json({ message: data });
  });
});

// post a todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo
    .save()
    .then(() => {
      res.status(200).json({ message: "Todo Inserted Successfully" });
    })
    .catch(() => {
      res.status(500).json({ message: "Todo Insert failed" });
    });
});

// post a multiple todo
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body)
    .then(() => {
      res.status(200).json({ message: "Todos were Inserted Successfully" });
    })
    .catch(() => {
      res.status(500).json({ message: "Todos Insert failed" });
    });
});

// PUT todo
router.put("/:id", async (req, res) => {
  await Todo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive",
        title: "Title Updated",
      },
    }
  ).then(() => {
    res.status(200).json({ message: "Todo updated" });
  });
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }).then(() =>
    res.status(200).json({ message: "Successfully deleted" })
  );
});

// Delete many todo
router.delete("/", async (req, res) => {
  await Todo.deleteMany({ status: "active" }).then(() =>
    res.status(200).json({ message: "Successfully deleted" })
  );
});

module.exports = router;
