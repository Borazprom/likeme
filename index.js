const { agregarPost, obtenerPosts } = require("./posts");
const express = require("express");
const app = express();
app.use(express.json());

app.listen(3000, console.log("SERVIDOR ENCENDIDO"));

app.get("/posts", async (req, res) => {
  const posts = await obtenerPosts();
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;
  await agregarPost(titulo, img, descripcion, likes);
  res.send("Post agregado con exito");
});
