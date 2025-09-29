import {
  saveCart,
  getCart,
  getCategories,
  getProduct,
  getProducts,
} from "./data-storage.js";

export async function homeHandler(_req, res) {
  const categories = await getCategories();
  res.render("home", { categories, title: "FullStock | Home" });
}

export async function categoryHandler(req, res) {
  const id = +req.params.id;
  const categories = await getCategories();
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return res.status(404).render("404", { title: "Category not found" });
  }

  const products = await getProducts(id);
  res.render("categories", {
    category,
    products,
    categories,
    title: `FullStock | ${category.name}`,
  });
}

export async function productsHandler(req, res) {
  const productId = Number(req.params.id);
  const product = await getProduct(productId);
  const categories = await getCategories();

  if (!product) {
    return res.status(404).render("404", { title: "Product not found" });
  }

  res.render("product", {
    product,
    categories,
    title: `FullStock | ${product.name}`,
  });
}

export async function addcartHandler(req, res) {
  const productId = Number(req.params.id);
  const product = await getProduct(productId);
  const cart = await getCart();

  cart.push(product);
  await saveCart(cart);

  res.redirect(303, `/categories/${product.categoryId}`);
}

export async function deleteCartHanlder(req, res) {
  const productId = Number(req.params.id);
  const cart = await getCart();
  const updatedCart = cart.filter((p) => p.id !== productId);

  await saveCart(updatedCart);
  res.redirect(303, "/cart");
}

export async function cartHanlder(_req, res) {
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
}

export async function signupHanlder(_req, res) {
  const categories = await getCategories();
  res.render("signup", { categories, title: "Fullstock | SignUp" });
}

export async function logingHandler(_req, res) {
  const categories = await getCategories();
  res.render("login", { categories, title: "Fullstock | login" });
}

export async function checkoutHanlder(_req, res) {
  const cart = await getCart();
  const categories = await getCategories();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  res.render("checkout", {
    cart,
    categories,
    total,
    title: "Fullstock | Checkout",
  });
}

export async function thanksHanlder(_req, res) {
  const categories = await getCategories();
  res.render("thanks", { categories, title: "Fullstock | Thanks" });
}
