// CREATE
exports.createCollectionBanner = (CollectionBanner, imageBaseUrl) => async (req, res) => {
  try {
    const bannerImage = req.file ? req.file.filename : null;

    const banner = await CollectionBanner.create({ bannerImage });
    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getCollectionBanners = (CollectionBanner) => async (req, res) => {
  try {
    const banners = await CollectionBanner.findAll();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
exports.getCollectionBannerById = (CollectionBanner) => async (req, res) => {
  try {
    const banner = await CollectionBanner.findByPk(req.params.id);
    if (!banner) return res.status(404).json({ message: "Collection Banner not found" });
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateCollectionBanner = (CollectionBanner, imageBaseUrl) => async (req, res) => {
  try {
    const banner = await CollectionBanner.findByPk(req.params.id);
    if (!banner) return res.status(404).json({ message: "Collection Banner not found" });

    const bannerImage = req.file ? req.file.filename : banner.bannerImage;

    await banner.update({ bannerImage });

    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteCollectionBanner = (CollectionBanner) => async (req, res) => {
  try {
    const banner = await CollectionBanner.findByPk(req.params.id);
    if (!banner) return res.status(404).json({ message: "Collection Banner not found" });

    await banner.destroy();
    res.status(200).json({ message: "Collection Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
