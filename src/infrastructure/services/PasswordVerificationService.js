const bcrypt = require("bcrypt");
const IPasswordVerificationService = require("../../application/Service_interfaces/IPasswordVerificationService");

class PasswordVerificationService extends IPasswordVerificationService {

  constructor() {
    super();
  }
  
  async execute(DBHash, password) {
    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, DBHash);
    if (!isPasswordValid) throw new Error("Invalid password.");
    return true;
  }
}

module.exports = PasswordVerificationService;