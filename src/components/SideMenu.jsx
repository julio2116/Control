import { useState } from "react";
import Aside from "./Aside.jsx";

const SideMenu = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-2 bg-blue-500 text-white h-fit fixed z-[49]"
        onClick={() => setIsOpen(true)}
      >
        Abrir menu
      </button>

      <Aside
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default SideMenu;
