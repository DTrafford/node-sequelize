const asyncHandler = require('../middlewares/asyncHandler');
const Plan = require('../models/plan');

exports.get = asyncHandler(async (req, res) => {
    try {
        const plans = await Plan.findAll();
        console.log("PLANS >> ", plans)
      return res.status(200).json({ success: true, data: page });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error?.message,
      });
    }
  });