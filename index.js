import express from "express";
import expressEjsLayouts from "express-ejs-layouts";

const port = 5500;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(expressEjsLayouts);
app.set("layout", "layout");

app.get("/", (_req, res) => {
  res.render("index", { title: "FullStock" });
});

app.get("/signup", (_req, res) => {
  res.render("signup", { title: "SignUp" });
});

app.get("/login", (_req, res) => {
  res.render("login", { title: "Login" });
});

app.get("/categories", (_req, res) => {
  res.render("categories", { title: "Categories" });
});

app.get("/product", (_req, res) => {
  res.render("product", { title: "Product" });
});

app.get("/cart", (_req, res) => {
  res.render("cart", { title: "Cart" });
});

app.get("/checkout", (_req, res) => {
  res.render("checkout", { title: "Checkout" });
});

app.get("/thanks", (_req, res) => {
  res.render("thanks", { title: "Thanks" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://locaslhost:${port}`);
});
