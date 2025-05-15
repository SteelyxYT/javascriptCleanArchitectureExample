const express = require("express");
const router = express.Router();


// Use cases
const RegisterUser = require("../../application/use_cases/Users/RegisterUser");
const GetUserProfile = require("../../application/use_cases/Users/GetUserProfile");
const LoginUser = require("../../application/use_cases/Users/LoginUser");


// Repositories
const InMemoryUserRepository = require("../../infrastructure/db/InSQLUserRepository");
// const InMemoryUserRepository = require("../../infrastructure/db/InMemoryUserRepository");

// services
const PasswordVerificationService = require("../../infrastructure/services/PasswordVerificationService");
const JWTService = require("../../infrastructure/services/JWTService");

// Controllers
const UserController = require("../../interfaces/controllers/UserController");


// Dependencies
const userRepository = new InMemoryUserRepository();
const passwordVerificationService = new PasswordVerificationService();
const jwtService = new JWTService();

const registerUserUseCase = new RegisterUser(userRepository);
const getUserProfileUseCase = new GetUserProfile(userRepository);
const loginUserUseCase = new LoginUser(userRepository, passwordVerificationService, jwtService);

const userController = UserController(registerUserUseCase, getUserProfileUseCase, loginUserUseCase);

router.post("/register", userController.register);
router.get("/profile/:username", userController.getProfile);
router.post("/login", userController.login);

module.exports = router;