import fs from "node:fs/promises";

export async function getCategories() {
  const categories = await fs.readFile("./src/data.json", "utf8");
  return JSON.parse(categories);
}

export async function getProducts(categoryId) {
  const content = await fs.readFile("./src/data.json", "utf8");
  const categories = JSON.parse(content);
  const category = categories.find((c) => c.id === categoryId);
  return category.products;
}

export async function getProduct(productId) {
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

export async function getCart() {
  const cart = await fs.readFile("./src/cart.json", "utf8");
  return JSON.parse(cart);
}

export async function saveCart(cart) {
  await fs.writeFile("./src/cart.json", JSON.stringify(cart, null, 2));
}
