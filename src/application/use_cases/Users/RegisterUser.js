const User = require("../../../domain/entities/User");

class RegisterUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(username, password, email) {

        //Runst findByUserName to check if user already exists
        const existing = await this.userRepository.findByUsername(username);
        if (existing) throw new Error("User already exists.");


        //Create user and save the user
        const user = new User(username, password, email, 1);
        const savedUser = await this.userRepository.save(user);
        if (!savedUser) throw new Error("User could not be saved.");

        return savedUser;

    }
}

module.exports = RegisterUser;