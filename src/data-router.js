import express from "express";
import {
  cartHanlder,
  categoryHandler,
  addcartHandler,
  productsHandler,
  thanksHanlder,
  signupHanlder,
  logingHandler,
  checkoutHanlder,
  deleteCartHanlder,
  homeHandler,
} from "./data-handler.js";
import { getCategories } from "./data-storage.js";

export const router = express.Router();

router.use(async (req, _res, next) => {
  const categories = await getCategories();
  req.categories = categories;
  next();
});

router.get("/", homeHandler);
router.get("/categories/:id", categoryHandler);
router.get("/products/:id", productsHandler);
router.post("/cart/:id", addcartHandler);
router.post("/cart/:id/delete", deleteCartHanlder);
router.get("/cart", cartHanlder);
router.get("/signup", signupHanlder);
router.get("/login", logingHandler);
router.get("/cart/checkout", checkoutHanlder);
router.get("/thanks", thanksHanlder);

router.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("Algo salio mal en el Data Router");
});
