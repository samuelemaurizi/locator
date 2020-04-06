const Location = require('../models/Location');

// @desc Get all locations
// @route GET /api/v1/locations
// @access Public
exports.getLocations = async (req, res, next) => {
  try {
    const location = await Location.find();

    return res.status(200).json({
      success: true,
      count: location.length,
      data: location
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error! Apologize' });
  }
};

// @desc Create locations
// @route POST /api/v1/locations
// @access Public
exports.addLocations = async (req, res, next) => {
  try {
    // console.log(req.body);
    const location = await Location.create(req.body);

    return res.status(200).json({
      success: true,
      data: location
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'This location already exists'
      });
    }
    res.status(500).json({ error: 'Server error! Apologize' });
  }
};
