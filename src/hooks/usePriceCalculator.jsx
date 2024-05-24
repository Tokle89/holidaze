import { useEffect, useState } from "react";

/**
 * A custom hook that calculates the total price based on the price of the venue, start date, and end date.
 * @param {Number} price - The price of the item
 * @param {Date} dateFrom - The start date
 * @param {Date} dateTo - The end date
 * @returns  {Number} - The total price
 * @example
 * const totalPrice = UsePriceCalculator(100, new Date("2022-01-01"), new Date("2022-01-10"));
 */

const UsePriceCalculator = (price, dateFrom, dateTo) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (dateFrom && dateTo) {
      const numberOfDays = Math.ceil((dateTo - dateFrom) / (1000 * 60 * 60 * 24));
      setTotalPrice(numberOfDays * price);
    }
  }, [dateFrom, dateTo, price]);

  return totalPrice;
};

export default UsePriceCalculator;
