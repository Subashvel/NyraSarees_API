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
const createBillRoutes = require("./routes/bill.routes");
const createCollectionBannerRoutes = require("./routes/collectionBanner.routes");
const createContactRoutes = require("./routes/contact.routes");
const createOrderRoutes = require("./routes/order.routes");



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
    const { sequelize, User, Category, SubCategory, Product, ProductVariant, ProductVariantChildImage, ProductStock, HomeBanner, Wishlist, Cart, Coupon, CollectionBanner, Bill } = await initModels();

    // Register routes
    // app.use('/api/register', createRegisterRoutes(User));
    app.use("/api/users", createUserRoutes(User));
    app.use('/api/categories', createCategoryRoutes(Category));
    app.use("/api/subcategories", createSubCategoryRoutes(SubCategory, Category));
    app.use("/api/products", require("./routes/product.routes")(Product, SubCategory, Category, ProductVariant, ProductVariantChildImage, imageBaseUrl));
    app.use("/api/product-variants", createProductVariantRoutes(ProductVariant, ProductStock, Product, SubCategory, Category, imageBaseUrl));
    app.use("/api/home-banners", createHomeBannerRoutes(HomeBanner, imageBaseUrl));
    app.use("/api/wishlist", createWishlistRoutes(Wishlist, ProductVariant, Product));
    app.use("/api/cart", createCartRoutes(Cart, ProductVariant, Product));
    app.use("/api/coupons", createCouponRoutes(Coupon));
    app.use("/api/product-variant-images", createProductVariantChildImageRoutes(ProductVariantChildImage, imageBaseUrl));
    app.use("/api/product-stock", require("./routes/productstock.routes")(ProductStock, ProductVariant));
    app.use("/api/admin", require("./routes/admin.routes"));
    const models = await initModels();
    app.use("/api/bill", require("./routes/bill.routes")(models.Bill, models.User));
    app.use("/api/collection-banners", createCollectionBannerRoutes(models.CollectionBanner, imageBaseUrl));
    app.use("/api/contacts", createContactRoutes(models.Contact));
    app.use("/api/newsletter", require("./routes/newsletter.routes")(models.Newsletter));
    app.use("/api/orders", createOrderRoutes);
    app.use("/api/low-stock", require("./routes/productvariant.routes")(
  ProductVariant, ProductStock, Product, SubCategory, Category, imageBaseUrl
));
    
  

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
