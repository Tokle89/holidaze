import { useAuth } from "../../AuthHandler";
import CustomButton from "../../Button";

function LoginButton() {
  const { setAuthMode, setShowModal } = useAuth();

  return (
    <CustomButton
      onClick={() => {
        setAuthMode(true);
        setShowModal(true);
      }}
      className="bg-secondary rounded-none text-primary border-secondary rounded-l hover:text-secondary hover:bg-primary"
    >
      Login
    </CustomButton>
  );
}

export default LoginButton;
