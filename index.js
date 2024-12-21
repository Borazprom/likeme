const { agregarPost, getPosts, putPosts, deletePost } = require("./posts");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json(), cors());
// const port = 3000;

// app.listen(port, () => console.log(`SERVIDOR ENCENDIDO" ${port}`));
app.listen(3000, console.log("SERVIDOR ENCENDIDO"));

app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion, likes } = req.body;
    await agregarPost(titulo, img, descripcion, likes);
    res.send("Post agregado con exito");
  } catch (error) {
    res.send(error.message);
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { likes } = req.body;
    //   const { img } = req.body;
    //   const { descripcion } = req.body;
    //   const { likes } = req.body;
    const response = await putPosts(id);
    res.status(200).send("actualizado con exito");
  } catch (error) {
    res.status(404).send(error.message);
  }

  app.delete("/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await deletePost(id);
      res.status(200).send("eliminado con exito");
    } catch (error) {
      res.send(error.message);
    }
  });
});
