
export const ValidateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateMobileNumber = (number) => {
  const re = /^\d{10}$/;
  return re.test(number);
};
