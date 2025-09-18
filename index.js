import express from "express";
import expressEjsLayouts from "express-ejs-layouts";

const port = 5500;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("./public"));
// app.use(expressEjsLayouts);

app.get("/", (_req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://locaslhost:${port}`);
});
