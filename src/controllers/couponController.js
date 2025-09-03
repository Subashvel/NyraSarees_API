// controllers/couponController.js
exports.createCoupon = (Coupon) => async (req, res) => {
  try {
    const { couponCodeName, minimumPurchaseAmount, discountUnit, discountValue, startDate, endDate } = req.body;

    const coupon = await Coupon.create({
      couponCodeName,
      minimumPurchaseAmount,
      discountUnit,
      discountValue,
      startDate,
      endDate,
    });

    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCoupons = (Coupon) => async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCoupon = (Coupon) => async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    await coupon.update(req.body);
    res.json({ success: true, data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCoupon = (Coupon) => async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    await coupon.destroy();
    res.json({ success: true, message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.validateCoupon = (Coupon) => async (req, res) => {
  try {
    const { couponCodeName, cartTotal } = req.body;

    const coupon = await Coupon.findOne({ where: { couponCodeName } });
    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }

    // Check date validity
    const today = new Date().toISOString().split("T")[0];
    if (today < coupon.startDate || today > coupon.endDate) {
      return res.status(400).json({ success: false, message: "Coupon expired or not active" });
    }

    // Check minimum purchase
    if (cartTotal < coupon.minimumPurchaseAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum purchase of ₹${coupon.minimumPurchaseAmount} required`,
      });
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discountUnit === "percentage") {
      discount = (cartTotal * coupon.discountValue) / 100;
    } else if (coupon.discountUnit === "flat") {
      discount = coupon.discountValue;
    }

    return res.json({ success: true, discount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
