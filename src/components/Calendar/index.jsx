import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { eachDayOfInterval, parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const BookingCalendar = ({ bookings, onDateChange, selectedDates }) => {
  const [startDate, setStartDate] = useState(selectedDates ? selectedDates[0] : null);
  const [endDate, setEndDate] = useState(selectedDates ? selectedDates[1] : null);
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

  useEffect(() => {
    if (selectedDates) {
      setStartDate(selectedDates[0]);
      setEndDate(selectedDates[1]);
    }
  }, [selectedDates]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      onDateChange(start, end);
    }
  };

  return <DatePicker selected={startDate} onChange={onChange} startDate={startDate} endDate={endDate} excludeDates={excludeDates} selectsRange inline />;
};

export default BookingCalendar;
