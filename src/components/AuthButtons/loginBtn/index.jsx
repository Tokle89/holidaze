import { useAuth } from "../../AuthHandler";
import CustomButton from "../../Button";

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
