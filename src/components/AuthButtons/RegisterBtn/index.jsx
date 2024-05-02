import { useAuth } from "../../AuthHandler";
import CustomButton from "../../Button";

function RegisterButton() {
  const { setAuthMode, setShowModal } = useAuth();

  return (
    <CustomButton
      onClick={() => {
        setAuthMode(false);
        setShowModal(true);
      }}
      className="bg-primary rounded-none text-secondary border-secondary rounded-r hover:text-primary hover:bg-secondary"
    >
      Register
    </CustomButton>
  );
}

export default RegisterButton;
