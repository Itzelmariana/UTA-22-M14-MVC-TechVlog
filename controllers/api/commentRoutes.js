const comments = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../../utils/fsUtils");

// GET Route for retrieving all the comments
comments.get("/", (req, res) => {
  readFromFile("./seeds/commentsData.json").then((data) =>
    res.json(JSON.parse(data))
  );
});

// GET Route for a specific comment
comments.get("/:comment_id", (req, res) => {
  const commentId = req.params.comment_id;
  readFromFile("./seeds/commentsData.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((comment) => comment.comment_id === commentId);
      return result.length > 0
        ? res.json(result)
        : res.json("No comment with that ID");
    });
});

// POST Route for a new UX/UI comment
comments.post("/", (req, res) => {
  console.log(req.body);

  const { name, comment } = req.body;

  if (req.body) {
    const newcomment = {
      name,
      comment,
      comment_id: uuidv4(),
    };

    readAndAppend(newcomment, "./seeds/commentsData.json");
  }
});

module.exports = comments;
