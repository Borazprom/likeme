// Importo las funciones y utilizo los metodos http
const { Pool } = require("pg"); //Exportar poll//
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "likeme",
  allowExitOnIdle: true,
});

const agregarPost = async (titulo, img, descripcion, likes) => {
  try {
    const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
    const values = [titulo, img, descripcion, likes];
    const result = await pool.query(consulta, values);
    console.log("post agregado");
  } catch (error) {
    throw new Error("No se pudo agregar el post");
  }
};

const getPosts = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    console.log(rows);
    return rows;
  } catch (error) {
    throw new Error("No se pudo obtener el post");
  }
};

const putPosts = async (id, likes) => {
  try {
    const consulta = "Update posts SET likes = likes + 1 where id=$1";
    const values = [id];
    const result = await pool.query(consulta, values);
    console.log(result.rowCount);
    if (result.rowCount != 0) {
      return true;
    } else {
      throw new Error("No se completo la actualizacion");
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deletePost = async (id) => {
  try {
    const consulta = "DELETE from posts Where id=$1";
    const values = [id];
    const result = await pool.query(consulta, values);
    console.log(result.rowCount);
    if (result.rowCount != 0) {
      return true;
    } else {
      throw new Error("Problemas al eliminar");
    }
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { agregarPost, getPosts, putPosts, deletePost };
