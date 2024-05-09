import { useEffect } from "react";
import { useContext } from "react";
import MessageContext from "../utils/MessageContexts";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";

const useResponseHandler = (response, action, id) => {
  const { showMessage, hideMessage } = useContext(MessageContext);
  const { name: userName } = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (response) {
      if (response.errors) {
        showMessage("error", `${response.errors[0].message}`);
      } else {
        switch (action) {
          case "POST":
            showMessage("success", "Booking successful");
            navigate(`/profile/${userName}/bookings/${response.data.id}`);
            setTimeout(() => {
              hideMessage();
            }, 1000);
            break;
          case "PUT":
            showMessage("success", "Booking updated");

            navigate(`/profile/${userName}/bookings/${id}`);

            break;
          case "DELETE":
            showMessage("success", "Booking cancelled");
            setTimeout(() => {
              navigate(`/profile/${userName}`);
              hideMessage();
            }, 1500);
        }
      }
    }
  }, [response, action]);
};

export default useResponseHandler;
