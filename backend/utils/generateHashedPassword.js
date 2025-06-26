const bcryptHelper = require('../config/passwordHashing');

(async () => {
  const plainPassword = 'sarita@1234'; // <- Change this
  const hashed = await bcryptHelper.hashPassword(plainPassword);
  console.log("Hashed Password:", hashed);
})();
