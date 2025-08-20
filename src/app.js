const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const initModels = require('./models');
// const createRegisterRoutes = require('./routes/register.routes');
const createCategoryRoutes = require('./routes/category.routes');

const createProductRoutes = require('./routes/product.routes');
const createVariantRoutes = require('./routes/variant.routes');



dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const imageBaseUrl = `${BASE_URL}/uploads`;

app.use(express.json());
app.use(cors());

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

(async () => {
  try {
    const { sequelize, Category, Product, Variant } = await initModels();

    // Register routes
    // app.use('/api/register', createRegisterRoutes(User));
    app.use('/api/categories', createCategoryRoutes(Category));
    app.use("/api/products", require("./routes/product.routes")(Product, Category, imageBaseUrl));
     app.use("/api/variants", require("./routes/variant.routes")(Variant, Product, imageBaseUrl));
    // app.use('/api/products', createProductRoutes(Product, imageBaseUrl));

    await sequelize.sync({ alter: true });
    console.log('✅ All models synchronized successfully.');
    console.log(`🖼 Image Base URL: ${imageBaseUrl}`);

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error starting server:', err);
  }
})();
