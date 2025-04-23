import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import apiRequest from "../../lib/apiRequest";


function Calendar({ userId, propertyId }) {
  const [dateTime, setDateTime] = useState(new Date());
  const [isBooked, setIsBooked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBookNow = async (e) => {
    e.preventDefault();
    setErrorMessage("");
  
    if (!dateTime) {
      alert("Please select a date and time.");
      return;
    }
  
    try {
      const response = await apiRequest.post("/reservation/check", {
        propertyId,
        userId,
        reservedDate: dateTime,
      });
  
      if (!response.data.available) {
        setErrorMessage(response.data.message || "This slot is already reserved.");
      } else {
        setIsBooked(true);
      }
    } catch (error) {
      console.error("Booking error:", error);
      setErrorMessage(error.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="calendar-container">
      <DatePicker
        selected={dateTime}
        onChange={(date) => setDateTime(date)}
        showTimeSelect
        timeFormat="hh:mm aa"
        timeIntervals={60}
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={new Date()}
        placeholderText="Select date and time"
        disabled={isBooked}
      />

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button className="book-now" onClick={handleBookNow} disabled={isBooked}>
        {isBooked ? "Slot Booked" : "Book Now"}
      </button>

      {isBooked && <p>Your slot has been successfully booked!</p>}
    </div>
  );
}

export default Calendar;
