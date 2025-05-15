class Booking {

    #id;
    #userId;
    #hotelId;
    #checkInDate;
    #checkOutDate;

  constructor(id, userId, hotelId, checkInDate, checkOutDate) {
    this.id = id;
    this.userId = userId;
    this.hotelId = hotelId;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
  }

  get bookingDetails() {
    return {
      id: this.id,
      userId: this.userId,
      hotelId: this.hotelId,
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
}

module.exports = Booking;