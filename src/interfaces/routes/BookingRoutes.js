const express = require("express");
const router = express.Router();

// Use cases
const CreateBooking = require("../../application/use_cases/Booking/CreateBooking");
const GetBookingById = require("../../application/use_cases/Booking/GetBookingById");
const GetAllBookings = require("../../application/use_cases/Booking/GetAllBookings");
const UpdateBooking = require("../../application/use_cases/Booking/UpdateBooking");
const DeleteBooking = require("../../application/use_cases/Booking/DeleteBooking");
const GetBookingByHotelId = require("../../application/use_cases/Booking/GetBookingByHotel");
const GetBookingByUserId = require("../../application/use_cases/Booking/GetBookingByUser");
const GetBookingByDateRange = require("../../application/use_cases/Booking/GetBookingByRange");

// repositories
const InSQLBookingRepository = require("../../infrastructure/db/InSQLBookingRepository");

// services

// controllers
const BookingController = require("../../interfaces/controllers/BookingController");

// Dependencies
const bookingRepository = new InSQLBookingRepository();

const createBookingUseCase = new CreateBooking(bookingRepository);
const getBookingByIdUseCase = new GetBookingById(bookingRepository);
const getAllBookingsUseCase = new GetAllBookings(bookingRepository);
const updateBookingUseCase = new UpdateBooking(bookingRepository);
const deleteBookingUseCase = new DeleteBooking(bookingRepository);
const getBookingByHotelUseCase = new GetBookingByHotelId(bookingRepository);
const getBookingByUserUseCase = new GetBookingByUserId(bookingRepository);
const getBookingByDateRangeUseCase = new GetBookingByDateRange(bookingRepository);

const bookingController = BookingController(createBookingUseCase, getAllBookingsUseCase, getBookingByIdUseCase, getBookingByUserUseCase, getBookingByHotelUseCase, getBookingByDateRangeUseCase, updateBookingUseCase, deleteBookingUseCase);

router.post("/", bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.get("/:bookingId", bookingController.getBookingById);
router.get("/hotel/:hotelId", bookingController.getBookingsByHotelId);
router.get("/user/:userId", bookingController.getBookingsByUserId);
router.get("/dateRange/", bookingController.getBookingsByDateRange);
router.put("/", bookingController.updateBooking);
router.delete("/:bookingId", bookingController.deleteBooking);



module.exports = router;