// controllers/wishlistController.js

exports.addToWishlist = (Wishlist) => async (req, res) => {
  try {
    const { userId, productVariantId } = req.body;

    // check if already exists
    const existing = await Wishlist.findOne({ where: { userId, productVariantId } });
    if (existing) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    const wishlistItem = await Wishlist.create({ userId, productVariantId });
    res.status(201).json({ message: "Product added to wishlist", wishlistItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWishlist = (Wishlist, ProductVariant, Product) => async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findAll({
      where: { userId },
      include: [
        {
          model: ProductVariant,
          as: "ProductVariant",
          attributes: ["productVariantId", "productVariantImage", "productId"], 
          include: [
            {
              model: Product,
              as: "Product",
              attributes: ["productId", "productName", "productOfferPrice", "productMrpPrice"]
            }
          ]
        }
      ]
    });

    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromWishlist = (Wishlist) => async (req, res) => {
  try {
    const { wishlistId } = req.params;

    await Wishlist.destroy({ where: { wishlistId } });

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
