// // controllers/variantController.js
// exports.createVariant = (Variant, imageBaseUrl) => async (req, res) => {
//   try {
//     const {
//       productId,
//       mrpPrice,
//       discountPrice,
//       description,
//       color,
//       quantity,
//       skuCode,
//       reviews,
//       leather,
//       brand,
//     } = req.body;

//     const images = {};
//     if (req.files) {
//       ["image", "thumbImage1", "thumbImage2", "thumbImage3", "thumbImage4"].forEach((field) => {
//         if (req.files[field]) {
//           images[field] = `${imageBaseUrl}/${req.files[field][0].filename}`;
//         }
//       });
//     }

//     const variant = await Variant.create({
//       productId,
//       mrpPrice,
//       discountPrice,
//       description,
//       color,
//       quantity,
//       skuCode,
//       reviews,
//       leather,
//       brand,
//       ...images,
//     });

//     res.status(201).json({ success: true, data: variant });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getVariants = (Variant, Product) => async (req, res) => {
//   try {
//     const variants = await Variant.findAll({
//       include: [{ model: Product, as: "Product" }],
//       order: [["variantId", "ASC"]],
//     });
//     res.status(200).json({ success: true, data: variants });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getVariantById = (Variant, Product) => async (req, res) => {
//   try {
//     const variant = await Variant.findByPk(req.params.id, {
//       include: [{ model: Product, as: "Product" }],
//     });

//     if (!variant) return res.status(404).json({ success: false, message: "Variant not found" });

//     res.status(200).json({ success: true, data: variant });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.updateVariant = (Variant, imageBaseUrl) => async (req, res) => {
//   try {
//     const variant = await Variant.findByPk(req.params.id);
//     if (!variant) return res.status(404).json({ success: false, message: "Variant not found" });

//     const {
//       mrpPrice,
//       discountPrice,
//       description,
//       color,
//       quantity,
//       skuCode,
//       reviews,
//       leather,
//       brand,
//     } = req.body;

//     const images = {};
//     if (req.files) {
//       ["image", "thumbImage1", "thumbImage2", "thumbImage3", "thumbImage4"].forEach((field) => {
//         if (req.files[field]) {
//           images[field] = `${imageBaseUrl}/${req.files[field][0].filename}`;
//         }
//       });
//     }

//     await variant.update({
//       mrpPrice,
//       discountPrice,
//       description,
//       color,
//       quantity,
//       skuCode,
//       reviews,
//       leather,
//       brand,
//       ...images,
//     });

//     res.status(200).json({ success: true, data: variant });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.deleteVariant = (Variant) => async (req, res) => {
//   try {
//     const variant = await Variant.findByPk(req.params.id);
//     if (!variant) return res.status(404).json({ success: false, message: "Variant not found" });

//     await variant.destroy();
//     res.status(200).json({ success: true, message: "Variant deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
