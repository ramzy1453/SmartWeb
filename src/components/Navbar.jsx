import { Link, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { useLang } from "../utils/lang_context";
import useMediaQuery from "../hooks/useMediaQuery";
import { T } from "./translate";
import { BsArrowReturnLeft } from "react-icons/bs";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { actualLang, setActualLang } = useLang();
  const { isXs } = useMediaQuery();
  const { pathname } = useLocation();
  return (
    <nav className={`navbar px-4 shadow-xl text-default`}>
      <div className="flex-1">
        {pathname !== "/" && (
          <Link to="/" className="btn btn-square">
            <BsArrowReturnLeft size={24} />
          </Link>
        )}

        <button className="btn btn-ghost normal-case text-xl">SmartWeb</button>
      </div>
      <div className="space-x-4">
        <div className="flex justify-center items-center">
          {!isXs && (
            <span className="mr-4">
              {isDark ? T("dark-mode") : T("light-mode")}
            </span>
          )}
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={isDark}
            onChange={toggleTheme}
          />
        </div>
        <select
          className="select select-bordered select-xs focus:outline-none"
          onChange={(e) => setActualLang(e.target.value)}
          value={actualLang}
        >
          <option value="ar">عربي</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>
    </nav>
  );
}
