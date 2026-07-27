const auth = require("../config/firebase");
const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");

const env = require("../config/env");
const logger = require("../config/logger");

const login = async (req, res) => {
  try {
    const { firebaseToken, githubAccessToken } = req.body;

    if (!firebaseToken) {
      return res.status(400).json({
        success: false,
        message: "Firebase token is required",
      });
    }

    const decodedToken = await auth.verifyIdToken(firebaseToken);

    const { uid, email, name, picture } = decodedToken;

    const user = await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        githubToken: githubAccessToken,
        name,
        avatar: picture,
      },
      create: {
        firebaseUid: uid,
        email,
        name,
        avatar: picture,
        githubToken: githubAccessToken,
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    logger.info(`User logged in successfully: ${user.email}`);

    return res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    logger.error(`Login failed: ${error.stack}`);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  login,
};