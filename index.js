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

app.get("/signup", (_req, res) => {
  res.render("signup");
});

app.get("/login", (_req, res) => {
  res.render("login");
});

app.get("/categories", (_req, res) => {
  res.render("categories");
});

app.get("/product", (_req, res) => {
  res.render("product");
});

app.get("/cart", (_req, res) => {
  res.render("cart");
});

app.get("/checkout", (_req, res) => {
  res.render("checkout");
});

app.get("/thanks", (_req, res) => {
  res.render("thanks");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://locaslhost:${port}`);
});
