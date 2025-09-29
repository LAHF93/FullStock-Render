import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";
import { router as DataRouter } from "./data-router.js";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();

// Views
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// Layouts
app.use(expressEjsLayouts);
app.set("layout", "layout");

// Routers
app.use("/", DataRouter);

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal en el Servidor");
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
