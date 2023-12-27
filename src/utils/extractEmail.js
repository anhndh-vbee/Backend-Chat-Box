const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const extractName = (email) => {
  const check = isValidEmail(email);
  if (check) {
    const username = email.split("@")[0];
    return username;
  }
};

module.exports = extractName;
