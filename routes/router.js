module.exports = (app) => {
  const App = require("../controllers/controller.js");

  app.get("/api", App.findAll);

  app.post("/api", App.createNewPost);

  app.delete("/api", App.delete);

  app.post("/api/comments", App.createNewComment);
};
