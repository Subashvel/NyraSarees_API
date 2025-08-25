const express = require('express');
const path = require("path");
const cors = require('cors');
const dotenv = require('dotenv');
const initModels = require('./models');
// const createRegisterRoutes = require('./routes/register.routes');
const createCategoryRoutes = require('./routes/category.routes');
const createSubCategoryRoutes = require("./routes/subcategory.routes");
const createProductRoutes = require('./routes/product.routes');
const createProductVariantRoutes = require('./routes/productvariant.routes');
const createUserRoutes = require("./routes/auth.routes");
const createHomeBannerRoutes = require("./routes/homeBanner.routes");
const createWishlistRoutes = require("./routes/wishlist.routes");
const createCartRoutes = require("./routes/cart.routes");
const createCouponRoutes = require("./routes/coupon.routes");
const createProductVariantChildImageRoutes = require("./routes/productVariantChildImage.routes");
// const createVariantRoutes = require('./routes/variant.routes');



dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const imageBaseUrl = `${BASE_URL}/uploads`;

app.use(express.json());
app.use(cors());


// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

(async () => {
  try {
    const { sequelize, User, Category, SubCategory, Product, ProductVariant, ProductVariantChildImage, HomeBanner, Wishlist, Cart, Coupon } = await initModels();

    // Register routes
    // app.use('/api/register', createRegisterRoutes(User));
    app.use("/api/users", createUserRoutes(User));
    app.use('/api/categories', createCategoryRoutes(Category));
    app.use("/api/subcategories", createSubCategoryRoutes(SubCategory, Category));
    app.use("/api/products", require("./routes/product.routes")(Product, SubCategory, Category, imageBaseUrl));
    app.use("/api/product-variants", createProductVariantRoutes(ProductVariant, Product, SubCategory, Category, imageBaseUrl));
    app.use("/api/home-banners", createHomeBannerRoutes(HomeBanner, imageBaseUrl));
    app.use("/api/wishlist", createWishlistRoutes(Wishlist, ProductVariant));
    app.use("/api/cart", createCartRoutes(Cart, ProductVariant, Product));
    app.use("/api/coupons", createCouponRoutes(Coupon));
    app.use("/api/product-variant-images", createProductVariantChildImageRoutes(ProductVariantChildImage));
    app.use("/api/admin", require("./routes/admin.routes"));


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
