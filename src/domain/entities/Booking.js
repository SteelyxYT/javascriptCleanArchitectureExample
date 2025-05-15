class Booking {

    #id;
    #userId;
    #hotelId;
    #amount;
    #checkInDate;
    #checkOutDate;

  constructor(userId, hotelId, checkInDate, checkOutDate, amount, id = null) {
    this.id = id;
    this.userId = userId;
    this.hotelId = hotelId;
    this.amount = amount; // Default value
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
  }

  get bookingDetails() {
    return {
      id: this.id,
      userId: this.userId,
      hotelId: this.hotelId,
      amount: this.amount,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
    };
  }
    get bookingId() {
        return this.id;
    }
    get bookingUserId() {
        return this.userId;
    }
    get bookingHotelId() {
        return this.hotelId;
    }
    get bookingCheckInDate() {
        return this.checkInDate;
    }
    get bookingCheckOutDate() {
        return this.checkOutDate;
    }
    get bookingAmount() {
        return this.amount;
    }
}

module.exports = Booking;