// CREATE
exports.createHomeBanner = (HomeBanner, imageBaseUrl) => async (req, res) => {
  try {
    const bannerImage = req.file ? req.file.filename : null;

    const banner = await HomeBanner.create({ bannerImage });
    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getHomeBanners = (HomeBanner) => async (req, res) => {
  try {
    const banners = await HomeBanner.findAll();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
exports.getHomeBannerById = (HomeBanner) => async (req, res) => {
  try {
    const banner = await HomeBanner.findByPk(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateHomeBanner = (HomeBanner, imageBaseUrl) => async (req, res) => {
  try {
    const banner = await HomeBanner.findByPk(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    const bannerImage = req.file ? req.file.filename : banner.bannerImage;

    await banner.update({ bannerImage });

    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteHomeBanner = (HomeBanner) => async (req, res) => {
  try {
    const banner = await HomeBanner.findByPk(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    await banner.destroy();
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
