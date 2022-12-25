const registerUser = (req, res) => {
  res.send("register route");
};

const loginUser = (req, res) => {
  res.send("Login Route");
};

module.exports = {
  registerUser,
  loginUser,
};
