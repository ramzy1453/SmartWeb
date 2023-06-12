import { createContext, useContext } from "react";

import { IntlProvider } from "react-intl";
import { useState } from "react";

import messages_enUS from "../lang/en-US.json";
import messages_fr from "../lang/fr.json";
import messages_ar from "../lang/ar.json";

const messages = {
  ar: messages_ar,
  en: messages_enUS,
  fr: messages_fr,
};

const language =
  localStorage.getItem("lang") || navigator.language.split(/[-_]/)[0] || "en";

const LangContext = createContext({
  actualLang: language,
  setActualLang: () => {},
});

const LangIntlProvider = ({ children }) => {
  const [actualLang, setActualLang] = useState(language);
  return (
    <IntlProvider locale={actualLang} messages={messages[actualLang]}>
      <LangContext.Provider
        value={{
          actualLang,
          setActualLang: (lang) => {
            localStorage.setItem("lang", lang);
            setActualLang(lang);
          },
        }}
      >
        {children}
      </LangContext.Provider>
    </IntlProvider>
  );
};

export const useLang = () => {
  const lang = useContext(LangContext);
  return lang;
};

export default LangIntlProvider;
