import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import { router as DataRouter } from "./data-router.js";

const port = 5500;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(expressEjsLayouts);
app.set("layout", "layout");

app.use("/", DataRouter);
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("Algo salio mal en el Servidor");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
