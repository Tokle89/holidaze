import useAuth from "../../AuthHandler/useAuth";
import CustomButton from "../../Button";

/**
 * Login Button component that redirects to the auth form when clicked. The authMode is set to true to display the login form, and the setShowModal is set to true to display the form modal.
 * @param {string} className - CSS classes for styling the button.
 * @param {string} children - Button text.
 * @returns {JSX.Element}
 * @example
 * <LoginButton className={"classes"}>Login</LoginButton>
 *
 */

function LoginButton({ className, children }) {
  const { setAuthMode, setShowModal } = useAuth();
  const baseClasses = "text-base w-32 font-medium rounded border border-2 transition-colors ease-in-out duration-300 ";
  return (
    <CustomButton
      onClick={() => {
        setAuthMode(true);
        setShowModal(true);
      }}
      className={`${baseClasses} ${className}`}
    >
      {children || "Login"}
    </CustomButton>
  );
}

export default LoginButton;
