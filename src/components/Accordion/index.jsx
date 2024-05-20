import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";

const Accordion = () => {
  const [open, setOpen] = useState(0);

  const handleClick = (index) => {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  const questions = [`How do i list my property on holidaze ?`, "How does the Payment process work ?", "What are the fees for becoming a host ?"];
  const answers = [
    "In order to list your property on Holidaze, you first need to sign up and register as a host. Once you've successfully registered, navigate to your profile page. There, you'll find an option labeled 'Create Venue'. Click on this option and follow the subsequent prompts to list your property on the platform.",
    "When a customer books a property on Holidaze, the payment is initially made to Holidaze. After the transaction is confirmed and processed, Holidaze then forwards the payment to the host. This process ensures a secure and reliable transaction for both parties involved.",
    "Holidaze operates with a fee structure where 20% of the payment made by your customers is retained as a service fee. This means that for every booking, Holidaze deducts 20% from the payment before forwarding the remaining balance to you. This fee helps support the platform and allows us to provide services like 24/7 customer support.",
  ];

  return (
    <div className="min-h-[270px]">
      {questions.map((question, index) => (
        <div key={index} className="relative mb-3">
          <h6 className="mb-0 text-tertiary">
            <button onClick={() => handleClick(index)} className="relative flex items-center w-full py-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500">
              <span>{question}</span>
              <i className={`absolute right-0 pt-1 text-base transition-transform fa fa-chevron-down ${open === index ? "transform rotate-180" : ""}`}>
                <FaArrowDown />
              </i>
            </button>
          </h6>
          {open === index && (
            <div className="transition-all duration-300 ease-in-out">
              <div className="py-4 text-sm leading-normal text-blue-gray-500/80">{answers[index]}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
