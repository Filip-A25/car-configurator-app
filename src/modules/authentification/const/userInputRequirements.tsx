export const validation = {
  username: {
    required: true,
    minLength: {
      value: 5,
      message: `Nickname must be atleast ${5} characters long.`,
    },
    maxLength: {
      value: 16,
      message: `Nickname cannot be longer than ${16} characters.`,
    },
  },
  email: {
    required: true,
  },
  password: {
    required: true,
    minLength: {
      value: 8,
      message: `Password must be atleast ${8} characters long.`,
    },
    maxLength: {
      value: 24,
      message: `Password cannot be longer than ${24} characters.`,
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,}$/,
      message:
        "Password must contain atleast one uppercase letter, one lowercase letter and a number or a special character.",
    },
  },
};
