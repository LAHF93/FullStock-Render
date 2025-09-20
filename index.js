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

async function getProduct(productId) {
  const content = await fs.readFile("./data.json", "utf8");
  const categories = JSON.parse(content);
  let product;
  for (const category of categories) {
    if (!category.products) continue;
    product = category.products.find((p) => p.id === productId);
    if (product) break;
  }
  return product;
}

async function getCart() {
  const cart = await fs.readFile("./cart.json", "utf8");
  return JSON.parse(cart);
}

async function saveCart(cart) {
  await fs.writeFile("./cart.json", JSON.stringify(cart, null, 2));
}

app.get("/", async (_req, res) => {
  const categories = await getCategories();
  res.render("home", { categories, title: "FullStock | Home" });
});

app.get("/categories/:id", async (req, res) => {
  const id = +req.params.id;
  const products = await getProducts(id);
  res.render("categories", { products, title: "FullStock | Categories" });
});

app.get("/products/:id", async (req, res) => {
  const productId = Number(req.params.id);
  const product = await getProduct(productId);
  if (!product) {
    return res.status(404).render("404", { title: "Product not found" });
  }
  res.render("product", { product, title: `FullStock | ${product.name}` });
});

app.post("/cart/:id", async (req, res) => {
  const productId = Number(req.params.id);
  const product = await getProduct(productId);
  const cart = await getCart();
  // validar si se repite el producto en el cart
  cart.push(product);
  await saveCart(cart);
  res.redirect(303, "/products");
  // fix the redirect problem
});

/*
app.get("/signup", (_req, res) => {
  res.render("signup", { title: "SignUp" });
});

app.get("/login", (_req, res) => {
  res.render("login", { title: "Login" });
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
