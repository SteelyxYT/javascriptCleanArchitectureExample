const express = require("express");
const router = express.Router();

// Use cases
const CreateHotel = require("../../application/use_cases/Hotel/CreateHotel");
const GetHotelById = require("../../application/use_cases/Hotel/GetHotelById");
const GetAllHotels = require("../../application/use_cases/Hotel/GetAllHotels");
const UpdateHotel = require("../../application/use_cases/Hotel/UpdateHotel");
const DeleteHotel = require("../../application/use_cases/Hotel/DeleteHotel");
const CreateRoom = require("../../application/use_cases/Hotel/CreateRoom");
const GetHotelRooms = require("../../application/use_cases/Hotel/GetHotelRooms");
const GetRoomById = require("../../application/use_cases/Hotel/GetRoom");

// repositories
const InSQLHotelRepository = require("../../infrastructure/db/InSQLHotelRepository");

// services
const AuthMiddleware = require("../middleware/AuthMiddleware");

// controllers
const HotelController = require("../../interfaces/controllers/HotelController");

// Dependencies
const hotelRepository = new InSQLHotelRepository();

const authMiddleware = new AuthMiddleware(3, true); // Example: only admin can create hotel

const createHotelUseCase = new CreateHotel(hotelRepository);
const getHotelByIdUseCase = new GetHotelById(hotelRepository);
const getAllHotelsUseCase = new GetAllHotels(hotelRepository);
const updateHotelUseCase = new UpdateHotel(hotelRepository);
const deleteHotelUseCase = new DeleteHotel(hotelRepository);
const createRoomUseCase = new CreateRoom(hotelRepository);
const getHotelRoomsUseCase = new GetHotelRooms(hotelRepository);
const getRoomByIdUseCase = new GetRoomById(hotelRepository);

const hotelController = HotelController(
  createHotelUseCase,
  createRoomUseCase,
  getHotelRoomsUseCase,
  getRoomByIdUseCase,
  getHotelByIdUseCase,
  getAllHotelsUseCase,
  updateHotelUseCase,
  deleteHotelUseCase
);

router.post("/create", authMiddleware.handle, hotelController.createHotel);
router.post(
  "/:hotelId/room",
  authMiddleware.handle,
  hotelController.createRoom
);
router.get("/:hotelId", hotelController.getHotel);
router.get("/:hotelId/rooms", hotelController.getHotelRooms);
router.get("/room/:roomId", hotelController.getRoomById);
router.get("/", hotelController.getAllHotels);
router.put("/:hotelId", authMiddleware.handle, hotelController.updateHotel);
router.delete("/:hotelId", authMiddleware.handle, hotelController.deleteHotel);

module.exports = router;
