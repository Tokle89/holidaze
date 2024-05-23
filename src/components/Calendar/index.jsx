import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { eachDayOfInterval, parseISO, isAfter, isBefore } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

/**
 * BookingCalendar component that displays a calendar for selecting booking dates. It takes bookings, onDateChange, and selectedDates as props, and it uses the react-datepicker library to display the calendar.
 * @param {array} bookings - An array of booking objects.
 * @param {function} onDateChange - A function that is called when the selected dates change.
 * @param {array} selectedDates - An array of selected dates.
 * @returns  {JSX.Element}
 * @example
 * <BookingCalendar bookings={bookings} onDateChange={handleDateChange} selectedDates={selectedDates} />
 */

const BookingCalendar = ({ bookings, onDateChange, selectedDates }) => {
  const [startDate, setStartDate] = useState(selectedDates ? selectedDates[0] : null);
  const [endDate, setEndDate] = useState(selectedDates ? selectedDates[1] : null);
  const [excludeDates, setExcludeDates] = useState([]);

  /**
   * useEffect hook that runs when the bookings prop changes. It creates an array of dates to exclude from the calendar.
   */
  useEffect(() => {
    const dates = bookings.flatMap((booking) =>
      eachDayOfInterval({
        start: parseISO(booking.dateFrom),
        end: parseISO(booking.dateTo),
      })
    );
    setExcludeDates(dates);
  }, [bookings]);

  /**
   * useEffect hook that runs when the selectedDates prop changes. It sets the start and end dates of the calendar.
   */
  useEffect(() => {
    if (selectedDates) {
      setStartDate(selectedDates[0]);
      setEndDate(selectedDates[1]);
    }
  }, [selectedDates]);

  /**
   *  Function that is called when the selected dates change. It sets the start and end dates of the calendar and calls the onDateChange function, and checks if the selected dates are valid so a user does not select a date range that includes a booked date, or a date range that is in the past.
   * @param {array} dates  - An array of selected dates.
   */
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
