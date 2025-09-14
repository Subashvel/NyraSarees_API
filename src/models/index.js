const initSequelize = require("../config/db");
const CategoryModel = require("./category");
const SubCategoryModel = require("./subcategory");
const ProductModel = require("./product");
const ProductVariantModel = require("./productvariant");
const UserModel = require("./user");
const HomeBannerModel = require("./homebanner");
const WishlistModel = require("./wishlist");
const CartModel = require("./cart");
const CouponModel = require("./coupon");
const ProductVariantChildImageModel = require("./productVariantChildImage");
const ProductStockModel = require("./productStock");
const BillModel = require("./bill");
const CollectionBannerModel = require("./collectionbanner");
const ContactModel = require("./contact");
const NewsletterModel = require("./newsletter");
const OrderSlotModel = require("./orderslot");
const ProductOrderModel = require("./productorder");
const OrderHistoryModel = require("./orderHistory");




// const VariantModel = require("./variant");

async function initModels() {
  const sequelize = await initSequelize();
  const Category = CategoryModel(sequelize);
  const SubCategory = SubCategoryModel(sequelize);
  const Product = ProductModel(sequelize);
  const ProductVariant = ProductVariantModel(sequelize);
  const User = UserModel(sequelize);
  const HomeBanner = HomeBannerModel(sequelize);
  const Wishlist = WishlistModel(sequelize);
  const Cart = CartModel(sequelize);
  const Coupon = CouponModel(sequelize);
  const ProductVariantChildImage = ProductVariantChildImageModel(sequelize);
  const ProductStock = ProductStockModel(sequelize);
  const Bill = BillModel(sequelize);
  const CollectionBanner = CollectionBannerModel(sequelize);
  const Contact = ContactModel(sequelize);
  const Newsletter = NewsletterModel(sequelize);
  const OrderSlot = OrderSlotModel(sequelize);
  const ProductOrder = ProductOrderModel(sequelize);
  const OrderHistory = OrderHistoryModel(sequelize);

  // const Variant = VariantModel(sequelize);


  // Associations

  // Category ↔ SubCategory
  Category.hasMany(SubCategory, { foreignKey: "categoryId", as: "SubCategories", onDelete: "CASCADE" });
  SubCategory.belongsTo(Category, { foreignKey: "categoryId", as: "Category" });

 // SubCategory ↔ Product 
  SubCategory.hasMany(Product, { foreignKey: "subCategoryId", as: "Products", onDelete: "CASCADE" });
  Product.belongsTo(SubCategory, { foreignKey: "subCategoryId", as: "SubCategory" });

  // Product ↔ ProductVariant
  Product.hasMany(ProductVariant, { foreignKey: "productId", as: "Variants", onDelete: "CASCADE" });
  ProductVariant.belongsTo(Product, { foreignKey: "productId", as: "Product" });

  
  // User ↔ Wishlist
  User.hasMany(Wishlist, { foreignKey: "userId", as: "WishlistItems", onDelete: "CASCADE" });
  Wishlist.belongsTo(User, { foreignKey: "userId", as: "User" });

  ProductVariant.hasMany(Wishlist, { foreignKey: "productVariantId", as: "WishlistedBy", onDelete: "CASCADE" });
  Wishlist.belongsTo(ProductVariant, { foreignKey: "productVariantId", as: "ProductVariant" });


  // User ↔ Cart
  User.hasMany(Cart, { foreignKey: "userId", as: "CartItems", onDelete: "CASCADE" });
  Cart.belongsTo(User, { foreignKey: "userId", as: "User" });
  
  // ProductVariant ↔ Cart
  ProductVariant.hasMany(Cart, { foreignKey: "productVariantId", as: "InCarts", onDelete: "CASCADE" });
  Cart.belongsTo(ProductVariant, { foreignKey: "productVariantId", as: "ProductVariant" });

  User.hasMany(Coupon, { foreignKey: "createdBy", as: "Coupons" });
  Coupon.belongsTo(User, { foreignKey: "createdBy", as: "User" });

  // ProductVariant ↔ ProductVariantChildImage (One-to-Many)
  ProductVariant.hasMany(ProductVariantChildImage, { foreignKey: "variantId", as: "ChildImages", onDelete: "CASCADE" });
  ProductVariantChildImage.belongsTo(ProductVariant, { foreignKey: "variantId", as: "ProductVariant" });

  // ProductVariant ↔ ProductStock (One-to-One)
  ProductVariant.hasOne(ProductStock, { foreignKey: "productVariantId", as: "Stock", onDelete: "CASCADE" });
  ProductStock.belongsTo(ProductVariant, { foreignKey: "productVariantId", as: "ProductVariant" });


  User.hasMany(Bill, { foreignKey: "userId", as: "Bills", onDelete: "CASCADE" });
  Bill.belongsTo(User, { foreignKey: "userId", as: "User" });
  // Product.hasMany(Variant, { foreignKey: "productId", as: "Variants", onDelete: "CASCADE" });
  // Variant.belongsTo(Product, { foreignKey: "productId", as: "Product" });

  // ProductOrder ↔ Bill (1:1)
  Bill.hasOne(ProductOrder, { foreignKey: "billId", as: "Order" });
  ProductOrder.belongsTo(Bill, { foreignKey: "billId", as: "Bill" }); 

  // User ↔ ProductOrder
  User.hasMany(ProductOrder, { foreignKey: "userId", as: "Orders", onDelete: "CASCADE" });
  ProductOrder.belongsTo(User, { foreignKey: "userId", as: "User" });

  // ProductOrder ↔ OrderSlot
  ProductOrder.hasMany(OrderSlot, { foreignKey: "productOrderId", as: "OrderSlots", onDelete: "CASCADE" });
  OrderSlot.belongsTo(ProductOrder, { foreignKey: "productOrderId", as: "ProductOrder" });

  // User ↔ OrderSlot (for quick reference)
  User.hasMany(OrderSlot, { foreignKey: "userId", as: "OrderSlots", onDelete: "CASCADE" });
  OrderSlot.belongsTo(User, { foreignKey: "userId", as: "User" });

  // ProductVariant ↔ OrderSlot (for quick product ref)
  ProductVariant.hasMany(OrderSlot, { foreignKey: "product_variant_id", as: "OrderSlots", onDelete: "CASCADE" });
  OrderSlot.belongsTo(ProductVariant, { foreignKey: "product_variant_id", as: "ProductVariant" });

  



  await sequelize.sync({ alter: true }); // auto create/update tables

  return { sequelize, Category, SubCategory, Product, ProductVariant, ProductVariantChildImage, ProductStock, User, HomeBanner, Wishlist, Cart, Coupon, Bill, CollectionBanner, Contact, Newsletter, OrderSlot, ProductOrder, OrderHistory };
  // OrderHistory
}

module.exports = initModels;