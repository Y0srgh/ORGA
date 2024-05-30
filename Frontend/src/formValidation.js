export const validateEmail = (email) => {
    const emailRegex = /^[a-z]+\.[a-z]+@insat\.ucar\.tn$/;
    return emailRegex.test(email);
  };
  
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;
    return passwordRegex.test(password);
};