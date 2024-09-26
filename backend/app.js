const express = require("express");
const helmet = require("helmet");
const app = express();


// const path = require('path');
// const fs = require('fs');

const hostname = "localhost";
const port = 8080;

// Importation des routes
const adminRoutes = require("./routes/admin.js");
const productRoutes = require("./routes/product.js");
const userRoutes = require("./routes/user.js");
const eventRoutes = require("./routes/event.js");
const articleRoutes = require("./routes/article.js");
const suggestionRoutes = require("./routes/suggestion.js");
const locationRoutes = require("./routes/location.js");
// const workRoutes = require("./routes/work.js");
// const emailRoutes = require('./routes/email.js');
// const adminRoutes = require("./routes/admin.js");
// const linkRoutes = require("./routes/link.js")


// Application d'helmet
app.use(helmet());

// Middlewares permettant l'analyse du corps de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Autorise l'accès à l'API et l'envoie de requêtes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Cross-Origin-Resource-Policy", ["same-site", "cross-origin"]);
  next();
});

// Définition des chemins vers les différentes routes
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/suggestion", suggestionRoutes);
app.use("/api/location", locationRoutes);
// app.use("/api/email", emailRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/link", linkRoutes);

// Gestion des requêtes vers la route '/images'
// app.use('/api/images', express.static(path.join(__dirname, 'images')));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
