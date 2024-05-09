import { useEffect, useState } from "react";
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
