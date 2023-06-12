import { useState } from "react";
import c from "classnames";
import Modal from "../components/Modal";
import useMediaQuery from "../hooks/useMediaQuery";
import t, { T } from "../components/translate";
import { useIntl } from "react-intl";

export default function SentimentAnalysis() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);

  const intl = useIntl();
  const openModal = () => {
    if (text !== "") {
      analyzeSentiment();
      setShowModal(true);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setLoading(false);
    setResult();
  };

  const analyzeSentiment = async () => {
    setLoading(true);
    const url = "https://sentiment-analysis9.p.rapidapi.com/sentiment";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "sentiment-analysis9.p.rapidapi.com",
      },
      body: JSON.stringify([{ text, language: "en" }]),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setResult(result[0].predictions[0]);
      setLoading(false);
      console.log(result[0].predictions[0]);
    } catch (error) {
      setError(true);
      setResult(intl.formatMessage({ id: "error" }));
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
          <span className="loading loading-lg">{t("predicting")}</span>
        )}
        {!loading && result && (
          <div className="flex justify-center items-center">
            {!error ? (
              <div
                className={c("flex justify-center gap-2 text-2xl", {
                  "text-green-500":
                    result.prediction.toLowerCase() === "positive",
                  "text-red-500":
                    result.prediction.toLowerCase() === "negative",
                })}
              >
                <span>{T(result.prediction.toLowerCase()).toUpperCase()}</span>
                <span>{(result.probability * 100).toFixed(2)}%</span>
              </div>
            ) : (
              <div className="text-2xl text-red-500">{result}</div>
            )}
          </div>
        )}
      </Modal>
      <div className="py-8" style={{ height: "calc(100vh - 128px)" }}>
        <h1 className="text-4xl mb-8 text-center">
          {t("tools.sentiment-analysis")}
        </h1>
        <p className="text-xl mb-8 text-center">
          {t("tools.sentiment-analysis.description")}
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
            {loading ? T("predicting") : T("predict")}
          </button>
        </div>
      </div>
    </>
  );
}
