import { useState } from "react";

export default function Expandable({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((currOpen) => !currOpen);

  return (
    <div>
      <button onClick={toggleOpen}>
        {isOpen ? "Close comments" : "Open comments"}
      </button>
      {isOpen && children}
    </div>
  );
}
