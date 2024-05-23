import { useState } from "react";
import MessageContext from "../../../utils/MessageContexts";
import UserMessage from "../Message";

/**
 *  A provider component that provides the message context to its children.
 * It uses the useState hook to manage the message state.
 * @param {Object} children - The children components that will be wrapped by the provider.
 *
 * @returns
 * <MessageContext.Provider value={{ message, showMessage, hideMessage }}>
 *     <UserMessage {...message} hideMessage={hideMessage} />
 *    {children}
 * </MessageContext.Provider>
 * @example
 * <MessageProvider>
 */

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
