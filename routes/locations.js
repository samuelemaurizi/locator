const express = require('express');

const { getLocations, addLocations } = require('../controllers/locations');

const router = express.Router();

router
  .route('/')
  .get(getLocations)
  .post(addLocations);

module.exports = router;
