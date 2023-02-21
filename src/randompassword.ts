export  function generateRandomPassword(minLength: number, maxLength: number, useSpecialChars: boolean=false): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const specialCharset = '!@#$%^&*()_+-={}[]|;:,.<>?/~';
  const length = Math.floor(Math.random() * (maxLength - minLength + 1) + minLength);
  let password = '';
  for (let i = 0; i < length; i++) {
    let randomIndex;
    if (useSpecialChars) {
      const combinedCharset = charset + specialCharset;
      randomIndex = Math.floor(Math.random() * combinedCharset.length);
      password += combinedCharset[randomIndex];
    } else {
      randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  }
  return password;
}
