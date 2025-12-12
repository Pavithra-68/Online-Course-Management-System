const Payment = require("../models/paymentModel");

exports.makePayment = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Save payment record
    await Payment.create({
      userId: req.user._id,
      courseId,
      status: "success"
    });

    res.json({
      status: "success",
      message: "Payment successful"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
