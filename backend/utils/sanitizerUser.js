module.exports = function sanitizeUser(user) {
  return {
    name: user.name,
    email: user.email,
  };
};
