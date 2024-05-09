import { useState } from "react";

import MessageContext from "../../../utils/MessageContexts";
import UserMessage from "../Message";

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState({ show: false, type: "", content: "" });

  const showMessage = (type, content) => {
    setMessage({ show: true, type, content });
  };

  const hideMessage = () => {
    setMessage({ show: false, type: "", content: "" });
  };

  return (
    <MessageContext.Provider value={{ message, showMessage, hideMessage }}>
      <UserMessage {...message} hideMessage={hideMessage} />
      {children}
    </MessageContext.Provider>
  );
};
