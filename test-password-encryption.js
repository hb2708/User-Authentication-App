// Simple test to demonstrate password encryption
const bcrypt = require('bcryptjs');

async function testPasswordEncryption() {
  const plainPassword = 'myPassword123';

  console.log('🔓 Original password:', plainPassword);

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  console.log('🔐 Hashed password:', hashedPassword);
  console.log('📏 Hash length:', hashedPassword.length);

  // Test comparison
  const isValid = await bcrypt.compare(plainPassword, hashedPassword);
  console.log('✅ Password validation:', isValid);

  // Test wrong password
  const wrongPassword = await bcrypt.compare('wrongPassword', hashedPassword);
  console.log('❌ Wrong password validation:', wrongPassword);

  console.log('\n🛡️ Password Security Analysis:');
  console.log('- Passwords are now hashed using bcrypt with salt rounds of 10');
  console.log('- Each hash is unique even for the same password (salt)');
  console.log('- Original password cannot be recovered from hash');
  console.log('- Brute force attacks are computationally expensive');
}

testPasswordEncryption().catch(console.error);
