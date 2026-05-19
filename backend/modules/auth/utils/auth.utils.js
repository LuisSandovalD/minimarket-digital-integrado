exports.sanitizeUser =
  (user) => {

    if (!user) {
      return null;
    }

    const sanitized = {
      ...user,
    };

    delete sanitized.password;

    return sanitized;

  };