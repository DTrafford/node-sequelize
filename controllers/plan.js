const asyncHandler = require("../middlewares/asyncHandler");
const db = require("../db");

exports.get = asyncHandler(async (req, res) => {
  try {
    const plans = await db.Plan.findAll();
    console.log("PLANS >> ", plans);
    return res.status(200).json({ success: true, plans });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
});

exports.create = asyncHandler(async (req, res) => {
  console.log("REQ BODY >>> ", req.body);
  try {
    const plan = await db.Plan.create(req.body);
    console.log("PLANS >> ", plan);
    return res.status(200).json({ success: true, plan: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
});
