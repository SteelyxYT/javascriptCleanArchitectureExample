class Login {
    constructor(userRepository, PasswordVerificationService, TokenService) {
        this.PasswordVerificationService = PasswordVerificationService;
        this.userRepository = userRepository;
        this.TokenService = TokenService;
    }

    async execute(username, password) {
        // Find the user by username
        const user = await this.userRepository.findByUsername(username);
        if (!user) throw new Error("User not found.");

        try {
            // Verify password
            const isPasswordValid = await this.PasswordVerificationService.execute(user.password, password);
            if (!isPasswordValid) throw new Error("Invalid password.");

            // Generate JWT token
            const token = await this.TokenService.generateToken(user);
            return token;

        } catch (error) {
            throw new Error("Login failed: " + error.message);
        }

    }
}

module.exports = Login;