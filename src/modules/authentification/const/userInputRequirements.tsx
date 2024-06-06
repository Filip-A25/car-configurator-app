const usernameMinLength = 5;
const usernameMaxLength = 16;

const passwordMinLength = 8;
const passwordMaxLength = 24;

const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,}$/;
const emailRegexp = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/;

export {
  usernameMinLength,
  usernameMaxLength,
  passwordMinLength,
  passwordMaxLength,
  passwordRegexp,
  emailRegexp,
};
