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
  const consulta = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)";
  const values = [titulo, img, descripcion, likes];
  const result = await pool.query(consulta, values);
  console.log("post agregado");
};

agregarPost("Felipe", "URL", "Muy lindo", "20");

const obtenerPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log(rows);
  return rows;
};

obtenerPosts();

module.exports = { agregarPost, obtenerPosts };
