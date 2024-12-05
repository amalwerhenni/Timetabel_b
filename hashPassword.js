// Exported as a function to hash the password
import bcryptjs from 'bcryptjs';

// The password you want to hash
const password = "12345678"; // Replace with your plain password

// Generate salt and hash the password
bcryptjs.hash(password, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed Password:', hashedPassword);
  }
});
