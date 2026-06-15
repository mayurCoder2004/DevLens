const auth = require("../config/firebase");
const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { firebaseToken, githubAccessToken } = req.body;

    console.log("GitHub Token:", githubAccessToken);

    console.log("LOGIN HIT");

    console.log(req.body);

    console.log(firebaseToken);

    if (!firebaseToken) {
      return res.status(400).json({
        success: false,
        message: "Firebase token required",
      });
    }

    const decodedToken = await auth.verifyIdToken(firebaseToken);

    const { uid, email, name, picture } = decodedToken;

    let user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        githubToken: githubAccessToken,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: uid,
          email,
          name,
          avatar: picture,
          githubToken: githubAccessToken,
        },
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
      },
    );

    return res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  login,
};
