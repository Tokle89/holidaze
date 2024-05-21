import { useEffect } from "react";
import { useContext } from "react";
import MessageContext from "../utils/MessageContexts";
import { useNavigate } from "react-router-dom";

const useResponseHandler = (response, actionType, action, setTriggerFetch) => {
  const { showMessage, hideMessage } = useContext(MessageContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const { name: userName } = user ? user : {};

  const navigate = useNavigate();
  useEffect(() => {
    if (response) {
      if (response.errors) {
        showMessage("error", `${response.errors[0].message}`);
      } else {
        switch (actionType) {
          case "booking":
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
                setTimeout(() => {
                  setTriggerFetch(new Date().getTime());
                  hideMessage();
                }, 1000);
                break;
              case "DELETE":
                showMessage("success", "Booking cancelled");
                setTimeout(() => {
                  navigate(`/profile/${userName}`);
                  setTriggerFetch(new Date().getTime());
                  hideMessage();
                }, 2000);
                break;
            }
            break;
          case "venue":
            switch (action) {
              case "POST":
                showMessage("success", "Venue created");
                setTimeout(() => {
                  navigate(`/profile/${userName}/venues/${response.data.id}`);
                  hideMessage();
                }, 1000);
                break;
              case "PUT":
                showMessage("success", "Venue updated");
                setTimeout(() => {
                  navigate(`/profile/${userName}/venues/${response.data.id}`);
                  hideMessage();
                }, 1000);
                break;
              case "DELETE":
                showMessage("success", "Venue deleted");
                setTimeout(() => {
                  navigate(`/profile/${userName}/venues/`);
                  setTriggerFetch(new Date().getTime());
                  hideMessage();
                }, 1000);
                break;
            }
            break;
          case "profile":
            switch (action) {
              case "PUT":
                showMessage("success", "Profile updated");
                setTimeout(() => {
                  localStorage.setItem("user", JSON.stringify(response.data));
                  navigate(`/profile/${userName}`);
                  hideMessage();
                }, 1000);
                break;
            }
            break;
        }
      }
    }
  }, [response, action, actionType]);
};

export default useResponseHandler;
