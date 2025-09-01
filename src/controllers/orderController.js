// controllers/orderController.js
const initModels = require("../models");

exports.checkout = async (req, res) => {
  const { billData, couponCodeName } = req.body;
  const userId = billData.userId; // 🔥 extract userId from billData

  try {
    const { ProductOrder, OrderSlot, Cart, ProductVariant, Product, Bill, SubCategory, Category } = await initModels();

    // 1. Fetch user cart
    const cartItems = await Cart.findAll({
  where: { userId },
  include: [
    {
      model: ProductVariant,
      as: "ProductVariant",
      include: [
        {
          model: Product,
          as: "Product",
          include: [
            {
              model: SubCategory,
              as: "SubCategory",
              include: [
                {
                  model: Category,
                  as: "Category",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2. Calculate totals safely
    let total_amount = 0;
    cartItems.forEach((item) => {
      if (item?.ProductVariant?.Product) {
        total_amount += item.ProductVariant.Product.productOfferPrice * item.quantity;
      }
    });

    // Apply coupon
    let discount = couponCodeName ? 100 : 0;
    const grand_total_amount = total_amount - discount;

    // 3. Save Bill (use billData instead of address)
    const bill = await Bill.create({
      userId,
      fullName: billData.fullName,
      email: billData.email,
      phoneNo: billData.phoneNo,
      townCity: billData.townCity,
      zipCode: billData.zipCode,
      addressLine1: billData.addressLine1,
      addressLine2: billData.addressLine2,
      additionalText: billData.additionalText,
    });

    // 4. Generate orderId
    const orderCount = await ProductOrder.count();
    const orderId = `NYRA-ORD-${String(orderCount + 1).padStart(2, "0")}`;

    // 5. Create ProductOrder
    const order = await ProductOrder.create({
      orderId,
      userId,
      billId: bill.id,
      couponCodeName,
      total_amount,
      grand_total_amount,
    });

    // 6. Create OrderSlots
    for (let item of cartItems) {
      const variant = item?.ProductVariant;
      const product = variant?.Product;

      await OrderSlot.create({
        productOrderId: order.id,
        userId,
        product_variant_id: item.productVariantId,
        productname: product?.productName || "Unknown",
        product_variant_image:
          variant?.productVariantImage || product?.productImage || null,
        quantity: item.quantity,
        total_price: (product?.productOfferPrice || 0) * item.quantity,
      });
    }

    // 7. Clear cart
    await Cart.destroy({ where: { userId } });

    res.status(201).json({ success: true, order, bill });
  } catch (error) {
    console.error("❌ Checkout error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const { ProductOrder, OrderSlot, Bill, User } = await initModels();

    const orders = await ProductOrder.findAll({
      include: [
        { model: Bill, as: "Bill" },
        { model: User, as: "User" },
        { model: OrderSlot, as: "OrderSlots" },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("❌ GetAllOrders error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { ProductOrder, OrderSlot, Bill, User } = await initModels();

    const order = await ProductOrder.findOne({
      where: { id },
      include: [
        { model: Bill, as: "Bill" },
        { model: User, as: "User" },
        { model: OrderSlot, as: "OrderSlots" },
      ],
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("❌ GetOrderById error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update order (deliveryStatus or paymentStatus)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryStatus, paymentStatus } = req.body;

    const { ProductOrder } = await initModels();

    const order = await ProductOrder.findByPk(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (deliveryStatus) order.deliveryStatus = deliveryStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("❌ UpdateOrderStatus error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get all orders for a specific user
exports.getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { ProductOrder, OrderSlot, Bill, User } = await initModels();

    const orders = await ProductOrder.findAll({
      where: { userId },
      include: [
        { model: Bill, as: "Bill" },
        { model: User, as: "User" },
        { model: OrderSlot, as: "OrderSlots" },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!orders.length) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("❌ GetOrdersByUserId error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};