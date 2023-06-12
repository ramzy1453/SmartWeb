import { useState } from "react";
import { MdKeyboardVoice } from "react-icons/md";
import t, { T } from "../components/translate";

export default function Text2Speech() {
  const [text, setText] = useState("");
  const talk = () => {
    const utterThis = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterThis);
  };
  return (
    <div className="py-8" style={{ height: "calc(100vh - 128px)" }}>
      <h1 className="text-4xl mb-8 text-center">{t("tools.text2speech")}</h1>
      <p className="text-xl mb-8 text-center">
        {t("tools.text2speech.description")}
      </p>
      <div className="flex flex-col items-center justify-center gap-6">
        <input
          type="text"
          placeholder={T("type-here")}
          className="input input-bordered w-full "
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn" onClick={talk}>
          <MdKeyboardVoice size={28} />
          <span className="mx-2">{t("talk")}</span>
        </button>
      </div>
    </div>
  );
}
