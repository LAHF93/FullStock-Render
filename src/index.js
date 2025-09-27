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
  const categories = await fs.readFile("./src/data.json", "utf8");
  return JSON.parse(categories);
}

async function getProducts(categoryId) {
  const content = await fs.readFile("./src/data.json", "utf8");
  const categories = JSON.parse(content);
  const category = categories.find((c) => c.id === categoryId);
  return category.products;
}

async function getProduct(productId) {
  const content = await fs.readFile("./src/data.json", "utf8");
  const categories = JSON.parse(content);

  // aca hice unos ajuste que chatgpt me sugirio para poder hacer el redirect a categories y no estar dando 2 veces para atras
  for (const category of categories) {
    if (!category.products) continue;
    const product = category.products.find((p) => p.id === productId);
    if (product) {
      return { ...product, categoryId: category.id };
    }
  }
  return null;
}

async function getCart() {
  const cart = await fs.readFile("./src/cart.json", "utf8");
  return JSON.parse(cart);
}

async function saveCart(cart) {
  await fs.writeFile("./src/cart.json", JSON.stringify(cart, null, 2));
}

app.get("/", async (_req, res) => {
  const categories = await getCategories();
  res.render("home", { categories, title: "FullStock | Home" });
});

app.get("/categories/:id", async (req, res) => {
  const id = +req.params.id;
  const categories = await getCategories();
  const category = categories.find((c) => c.id === id);
  // el if me lo recomendo chatgpt
  if (!category) {
    return res.status(404).render("404", { title: "Category not found" });
  }
  const products = await getProducts(id);
  res.render("categories", {
    category,
    products,
    categories,
    title: "FullStock | Categories",
  });
});

app.get("/products/:id", async (req, res) => {
  const productId = Number(req.params.id);
  const product = await getProduct(productId);
  const categories = await getCategories();
  // el if me lo recomendo chatgpt
  if (!product) {
    return res.status(404).render("404", { title: "Product not found" });
  }
  res.render("product", {
    product,
    categories,
    title: `FullStock | ${product.name}`,
  });
});

app.post("/cart/:id", async (req, res) => {
  const productId = Number(req.params.id);
  const product = await getProduct(productId);
  const cart = await getCart();
  cart.push(product);
  await saveCart(cart);
  res.redirect(303, `/categories/${product.categoryId}`);
});

app.post("/cart/:id/delete", async (req, res) => {
  const productId = Number(req.params.id);
  const cart = await getCart();
  const updatedCart = cart.filter((p) => p.id !== productId);
  await saveCart(updatedCart);
  res.redirect(303, "/cart");
});

app.get("/cart", async (_req, res) => {
  const cart = await getCart();
  const categories = await getCategories();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const emptyMessage =
    "No tienes productos por el momento. Anda a la sección de nuestros productos y empieza añadir los productos que más te gusten.";
  res.render("cart", {
    cart,
    categories,
    total,
    emptyMessage,
    title: "Fullstock | Cart",
  });
});

app.get("/signup", async (_req, res) => {
  const categories = await getCategories();
  res.render("signup", { categories, title: "Fullstock | SignUp" });
});

app.get("/login", async (_req, res) => {
  const categories = await getCategories();
  res.render("login", { categories, title: "Fullstock | login" });
});

app.get("/cart/checkout", async (_req, res) => {
  const cart = await getCart();
  const categories = await getCategories();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  res.render("checkout", {
    cart,
    categories,
    total,
    title: "Fullstock | Checkout",
  });
});

app.get("/thanks", async (_req, res) => {
  const categories = await getCategories();
  res.render("thanks", { categories, title: "Fullstock | Thanks" });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://locaslhost:${port}`);
});
