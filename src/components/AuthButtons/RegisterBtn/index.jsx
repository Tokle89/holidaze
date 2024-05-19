import { useAuth } from "../../AuthHandler";
import CustomButton from "../../Button";

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
