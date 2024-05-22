import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { eachDayOfInterval, parseISO, isAfter, isBefore } from "date-fns";
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
    if (start && end) {
      const isInvalidRange = excludeDates.some((date) => isAfter(date, start) && isBefore(date, end));
      if (!isInvalidRange) {
        setStartDate(start);
        setEndDate(end);
        onDateChange(start, end);
      } else if (isInvalidRange) {
        setStartDate(null);
        setEndDate(null);
      }
    } else {
      setStartDate(start);
      setEndDate(end);
    }
  };

  return <DatePicker selected={startDate} onChange={onChange} startDate={startDate} endDate={endDate} minDate={new Date()} excludeDates={excludeDates} selectsRange inline />;
};

export default BookingCalendar;
