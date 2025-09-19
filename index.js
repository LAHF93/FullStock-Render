import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import fs from "node:fs/promises";

const port = 5500;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(expressEjsLayouts);
app.set("layout", "layout");

async function getCategories() {
  const categories = await fs.readFile("./data.json", "utf8");
  return JSON.parse(categories);
}

async function getProducts(categoryId) {
  const content = await fs.readFile("./data.json", "utf8");
  const categories = JSON.parse(content);
  const category = categories.find((c) => c.id === categoryId);
  return category.products;
}

app.get("/", async (_req, res) => {
  const categories = await getCategories();
  res.render("home", { categories, title: "FullStock | Home" });
});

app.get("/categories/:id", async (req, res) => {
  const id = +req.params.id;
  const products = await getProducts(id);
  res.render("categories", { products, title: "Fullstock | Categories" });
});

/*
app.get("/signup", (_req, res) => {
  res.render("signup", { title: "SignUp" });
});

app.get("/login", (_req, res) => {
  res.render("login", { title: "Login" });
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
*/

app.listen(port, () => {
  console.log(`Servidor corriendo en http://locaslhost:${port}`);
});
