import useAuth from "../../AuthHandler/useAuth";
import CustomButton from "../../Button";

/**
 * Register Button component that redirects to the auth form when clicked. The authMode is set to false to display the register form, and the setShowModal is set to true to display the form modal.
 * @param {string} className - CSS classes for styling the button.
 * @param {string} children - Button text.
 * @returns {JSX.Element}
 * @example
 * <RegisterButton className={"classes"} >Register</RegisterButton>
 *
 */

function RegisterButton({ className }) {
  const { setAuthMode, setShowModal } = useAuth();

  return (
    <CustomButton
      onClick={() => {
        setAuthMode(false);
        setShowModal(true);
      }}
      className={className}
    >
      Register
    </CustomButton>
  );
}

export default RegisterButton;
