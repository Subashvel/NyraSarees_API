// controllers/cartController.js

exports.addToCart = (Cart, ProductVariant) => async (req, res) => {
  try {
    const { userId, productVariantId, quantity } = req.body;

    // Validate inputs
    if (!userId || !productVariantId || !quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Check if productVariant exists
    const variant = await ProductVariant.findByPk(productVariantId);
    if (!variant) {
      return res.status(404).json({ message: "Product Variant not found" });
    }

    // Check if already in cart
    const existingCartItem = await Cart.findOne({ where: { userId, productVariantId } });

    if (existingCartItem) {
      // ❌ Don't increase quantity automatically
      return res.status(200).json({
        message: "Already in cart",
        cartItem: existingCartItem
      });
    }

    // ✅ otherwise create new cart item
    const cartItem = await Cart.create({
      userId,
      productVariantId,
      quantity,
    });

    res.status(201).json({ message: "Product added to cart", cartItem });
  } catch (err) {
    console.error("Error in addToCart:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = (Cart, ProductVariant, Product) => async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [
        {
          model: ProductVariant,
          as: "ProductVariant",
          include: [{ model: Product, as: "Product" }],
        },
      ],
    });

    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCart = (Cart) => async (req, res) => {
  try {
    const { cartId } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findByPk(cartId);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: "Cart item updated", cartItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromCart = (Cart) => async (req, res) => {
  try {
    const { cartId } = req.params;

    await Cart.destroy({ where: { cartId } });

    res.status(200).json({ message: "Product removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
