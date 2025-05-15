class Hotell {

    #hotelID;
    #hotelName;
    #hotelLocation;
    #hotelStjerner;


    constructor(name, location, stjerner = 0, hotelID = null) {
        this.#hotelID = hotelID;
        this.#hotelName = name;
        this.#hotelLocation = location;
        this.#hotelStjerner = stjerner;
    }

    get info() {
        return {
            hotelID: this.#hotelID,
            hotelName: this.#hotelName,
            hotelLocation: this.#hotelLocation,
            hotelStjerner: this.#hotelStjerner
        }
    }

    get hotelID() {
        return this.#hotelID;
    }
    get hotelName() {
        return this.#hotelName;
    }
    get hotelLocation() {
        return this.#hotelLocation;
    }
    get hotelStjerner() {
        return this.#hotelStjerner;
    }
    
}

module.exports = Hotell;