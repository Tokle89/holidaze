import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { eachDayOfInterval, parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const BookingCalendar = ({ bookings, onDateChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [excludeDates, setExcludeDates] = useState([]);

  useEffect(() => {
    const dates = bookings.flatMap((booking) =>
      eachDayOfInterval({
        start: parseISO(booking.dateFrom),
        end: parseISO(booking.dateTo),
      })
    );
    setExcludeDates(dates);
  }, [bookings]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onDateChange(start, end);
  };
  return <DatePicker selected={startDate} onChange={onChange} startDate={startDate} endDate={endDate} excludeDates={excludeDates} selectsRange selectsDisabledDaysInRange inline />;
};

export default BookingCalendar;