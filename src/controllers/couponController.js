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
