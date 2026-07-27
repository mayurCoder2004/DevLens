const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const loginAsTestUser = async (req, res, next) => {
  try {
    const email = process.env.TEST_USER_EMAIL;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Test user not found",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginAsTestUser,
};