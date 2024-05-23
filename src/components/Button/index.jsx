/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";

/**
 * A custom button component that can be styled using Tailwind CSS classes, trigger a function when clicked,  a type attribute, and  takes the button text as children. It takes all these additional props and passes them to the Button component from the Material Tailwind library.
 *
 * @param {function} onClick - Function to be executed when the button is clicked.
 * @param {string} className - CSS classes for styling the button.
 * @param {string} children - Button text.
 * @param {string} type - Button type.
 * @returns  {JSX.Element}
 * @example
 * <CustomButton onClick={handleClick} className={"classes"} type="submit">Submit</CustomButton>
 */

const CustomButton = ({ onClick, className, children, type }) => {
  const baseClasses = "text-base w-32 font-medium rounded border border-2 transition-colors ease-in-out duration-300 ";
  return (
    <Button onClick={onClick} type={type} className={`${baseClasses} ${className}`}>
      {children}
    </Button>
  );
};

export default CustomButton;
