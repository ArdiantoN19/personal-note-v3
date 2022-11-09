import React, { useContext } from "react";
import LocaleContext from "../contexts/LocaleContexts";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

function ThemeButton() {
  const { theme, toggleTheme } = useContext(LocaleContext);
  return (
    <button className="toggle-theme" onClick={toggleTheme}>
      {theme === "dark" ? <BsFillSunFill /> : <BsFillMoonFill />}
    </button>
  );
}

export default ThemeButton;
