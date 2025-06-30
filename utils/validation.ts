export const validatePhoneNumber = (phone: string): string | undefined => {
  if (!phone) {
    return "Phone number is required";
  }

  // Iranian phone number validation
  const iranPhoneRegex = /^(?:(?:0098|\\+98|0)(9[0-9]{9}))$/;
  if (!iranPhoneRegex.test(phone)) {
    return "Please enter a valid Iranian phone number (e.g., 09123456789)";
  }

  return undefined;
};
