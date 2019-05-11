exports.isAuthorizedUser = user => {
  if (user.toLowerCase().trim() === 'admin') {
    return true;
  }
  return false;
};
