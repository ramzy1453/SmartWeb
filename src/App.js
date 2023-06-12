import Navbar from "./components/Navbar";
import useTheme from "./hooks/useTheme";
import Router from "./routes";
import { useLang } from "./utils/lang_context";

function App() {
  const { bgTheme } = useTheme();
  const { actualLang } = useLang();
  const dir = actualLang === "ar" ? "rtl" : "ltr";
  return (
    <>
      <Navbar />
      <div className={`py-8 px-8 md:px-16 lg:px-24`} dir={dir}>
        <Router />
      </div>
    </>
  );
}

export default App;
