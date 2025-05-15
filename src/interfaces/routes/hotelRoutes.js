const express = require("express");
const router = express.Router();

// Use cases
const CreateHotel = require("../../application/use_cases/Hotel/CreateHotel");
const GetHotelById = require("../../application/use_cases/Hotel/GetHotelById");
const GetAllHotels = require("../../application/use_cases/Hotel/GetAllHotels");
const UpdateHotel = require("../../application/use_cases/Hotel/UpdateHotel");
const DeleteHotel = require("../../application/use_cases/Hotel/DeleteHotel");

// repositories
const InSQLHotelRepository = require("../../infrastructure/db/InSQLHotelRepository");

// services

// controllers
const HotelController = require("../../interfaces/controllers/HotelController");    

// Dependencies
const hotelRepository = new InSQLHotelRepository();

const createHotelUseCase = new CreateHotel(hotelRepository);
const getHotelByIdUseCase = new GetHotelById(hotelRepository);
const getAllHotelsUseCase = new GetAllHotels(hotelRepository);
const updateHotelUseCase = new UpdateHotel(hotelRepository);
const deleteHotelUseCase = new DeleteHotel(hotelRepository);

const hotelController = HotelController(createHotelUseCase, getHotelByIdUseCase, getAllHotelsUseCase, updateHotelUseCase, deleteHotelUseCase);

router.post("/create", hotelController.createHotel);
router.get("/:hotelId", hotelController.getHotel);
router.get("/", hotelController.getAllHotels);
router.put("/:hotelId", hotelController.updateHotel);
router.delete("/:hotelId", hotelController.deleteHotel);


module.exports = router;