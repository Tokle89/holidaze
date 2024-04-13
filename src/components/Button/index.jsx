/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";

const CustomButton = ({ className, children }) => {
  const baseClasses = "text-base w-32 font-base rounded border border-2";
  return <Button className={`${baseClasses} ${className}`}>{children}</Button>;
};

export default CustomButton;
