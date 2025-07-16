const generateToken = () => {
  return Math.random().toString(36).substring(2, 8); // e.g. - 'xyz123'
};

module.exports = generateToken;
