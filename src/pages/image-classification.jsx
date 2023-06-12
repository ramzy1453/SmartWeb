import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import c from "classnames";
import useMediaQuery from "../hooks/useMediaQuery";
import { classifyImage } from "../utils/tf";
import Modal from "../components/Modal";
import SpinLoader from "../components/SpinLoader";
import t, { T } from "../components/translate";

// i want a page un middle there is the title then you choose the page you want to go to
export default function ImageClassification() {
  const [image, setImage] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const { isXs } = useMediaQuery();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    const file = acceptedFiles[0];
    reader.readAsDataURL(file);
    reader.onabort = () => console.log("File reading was aborted");
    reader.onerror = () => console.log("File reading has failed");
    reader.onload = () => {
      setImage(reader.result);
    };
  }, []);

  const makePrediction = async () => {
    openModal();
    setLoading(true);
    setPredictions([]);
    const predictions = await classifyImage(image);
    setPredictions(predictions);
    setLoading(false);
  };

  console.log(predictions);
  const clear = () => {
    setImage(undefined);
  };
  const file = (e) => {
    setImage(e.target.files[0]);
  };

  const dropzone = useDropzone({ onDrop });

  return (
    <div className={c({ "h-screen": !image })}>
      <Modal
        showModal={showModal}
        openModal={openModal}
        closeModal={closeModal}
      >
        {loading && (
          <div className="flex justify-center items-center">
            <SpinLoader text={T("predicting")} />
          </div>
        )}
        {predictions &&
          predictions.map(({ className, probability }) => (
            <>
              <div
                key={className}
                className={c("flex justify-between text-lg items-center", {
                  "text-red-500": probability < 0.5,
                  "text-green-500": probability >= 0.5,
                })}
              >
                <p>{className}</p>
                <p>{(probability * 100).toFixed(2)}%</p>
              </div>
              <div className="divider divider-vertical my-2"></div>
            </>
          ))}
      </Modal>
      {!false && (
        <div className="py-8 flex flex-col justify-center items-center">
          <h1 className="text-4xl mb-8 text-center">
            {t("tools.image-detection")}
          </h1>
          <p className="text-xl mb-8 text-center">
            {T("tools.image-detection.description")}
          </p>
          <div
            {...dropzone.getRootProps({
              className:
                "p-4 flex flex-col jusify-center items-center bg-white rounded-lg",
            })}
          >
            <div
              {...dropzone.getInputProps()}
              className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
              style={{ width: isXs ? "100%" : "450px" }}
            >
              <svg
                className="text-blue-500 w-24 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="input_field flex flex-col w-max mx-auto text-center">
                <label>
                  <input
                    className="text-sm cursor-pointer w-36 hidden"
                    type="file"
                    onChange={file}
                  />
                  <div className="text bg-blue-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-500">
                    {t("select")}
                  </div>
                </label>

                <div className="title text-blue-500 my-2 uppercase">
                  {t("drop-files")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {image && (
        <div className="flex flex-col flex-1 justify-center items-center">
          <div className="flex flex-col md:flex-row gap-6 my-8">
            <button
              className="btn btn-wide bg-red-600 hover:bg-red-500"
              onClick={clear}
            >
              {t("clear")}
            </button>
            <button
              onClick={makePrediction}
              className={c("btn btn-wide bg-green-600 hover:bg-green-500", {
                loading: false,
              })}
            >
              {t("predict")}
            </button>
          </div>
          <img src={image} />
        </div>
      )}
    </div>
  );
}
