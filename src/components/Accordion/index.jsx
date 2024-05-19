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

  const questions = ["What is Material Tailwind?", "How to use Material Tailwind?", "What can I do with Material Tailwind?"];
  const answers = ["Answer 1", "Answer 2", "Answer 3"];

  return (
    <div className="max-w-[600px] mx-auto">
      {questions.map((question, index) => (
        <div key={index} className="relative mb-3">
          <h6 className="mb-0">
            <button onClick={() => handleClick(index)} className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500">
              <span>{question}</span>
              <i className={`absolute right-0 pt-1 text-base transition-transform fa fa-chevron-down ${open === index ? "transform rotate-180" : ""}`}>
                <FaArrowDown />
              </i>
            </button>
          </h6>
          {open === index && (
            <div className="transition-all duration-300 ease-in-out">
              <div className="p-4 text-sm leading-normal text-blue-gray-500/80">{answers[index]}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
