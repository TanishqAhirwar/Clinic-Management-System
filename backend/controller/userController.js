const User = require("../model/userModel");
const ApiResponse = require("../response/pattern");
const JWT = require("../config/tokenManager");
const Bcrypt = require("../config/passwordHashing");

async function userLogin(req, res) {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.json(new ApiResponse(false, null, "User not found"));
    }
    user = user.toObject();

    let isMatch = await Bcrypt.comparePassword(password, user.password);

    if (!isMatch) {
      return res.json(new ApiResponse(false, null, "Invalid password"));
    }

    let token = JWT.genarateToken(user);

    user.token = token;

    return res.json(new ApiResponse(true, user, "User Login successfully"));
  } catch (error) {
    console.error(error);
    return res.json(new ApiResponse(false, null, error.message));
  }
}

async function addReceptionist(req,res) {
  const { username, email, password, clinic } = req.body;
  try {
    let hashedPassword = await Bcrypt.hashPassword(password);
    let user = await User.create({
      username,
      email,
      password:hashedPassword,
      clinic,
    });

    if (!user) {
      return res.json(
        new ApiResponse(false, null, "Receptionist not register")
      );
    }

    return res.json(
      new ApiResponse(true, user, "Receptionist registered successfully")
    );
  } catch (error) {
    console.error(error);
    return res.json(new ApiResponse(false, null, error.message));
  }
}

module.exports = { userLogin, addReceptionist };
