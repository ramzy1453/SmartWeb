import { useState } from "react";
import c from "classnames";
import Modal from "../components/Modal";
import useMediaQuery from "../hooks/useMediaQuery";
import t, { T } from "../components/translate";
import { useIntl } from "react-intl";

export default function LanguageDetection() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState();
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);
  const intl = useIntl();
  const openModal = () => {
    if (text !== "") {
      detectLANG();
      setShowModal(true);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setLoading(false);
    setResult();
  };

  const detectLANG = async () => {
    setLoading(true);
    const url = "https://language-detection4.p.rapidapi.com/language-detection";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "language-detection4.p.rapidapi.com",
      },
      body: JSON.stringify([{ text }]),
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setResult(result[0].detected_languages[0]);
    } catch (error) {
      setError(true);
      setResult(intl.formatMessage({ id: "error" }));
      console.log("object");
    } finally {
      setLoading(false);
    }
  };

  const { isXs } = useMediaQuery();

  return (
    <>
      <Modal
        showModal={showModal}
        openModal={openModal}
        closeModal={closeModal}
      >
        {loading && (
          <span className="loading loading-lg">{t("detecting")}...</span>
        )}
        {!loading && result && (
          <div className="flex justify-center items-center">
            <div className="flex justify-center gap-2 text-2xl">
              {!error ? (
                <>
                  <span>{result.prediction.toUpperCase()}</span>
                  <span>{(result.probability * 100).toFixed(2)}%</span>
                </>
              ) : (
                <span className="text-red-500 text-lg lg:text-xl">
                  {result}
                </span>
              )}
            </div>
          </div>
        )}
      </Modal>
      <div className="py-8" style={{ height: "calc(100vh - 128px)" }}>
        <h1 className="text-4xl mb-8 text-center">
          {t("tools.language-detection")}
        </h1>
        <p className="text-xl mb-8 text-center">
          {t("tools.language-detection.description")}
        </p>
        <div className="flex flex-col items-center justify-center gap-6">
          <input
            type="text"
            placeholder={T("type-here")}
            className="input input-bordered w-full "
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className={c("btn", {
              "btn-disabled": loading,
              "btn-wide": !isXs,
              "btn-block": isXs,
            })}
            onClick={openModal}
          >
            {loading && <span className="loading loading-spinner"></span>}
            {loading ? T("detecting") : T("detect")}
          </button>
        </div>
      </div>
    </>
  );
}
