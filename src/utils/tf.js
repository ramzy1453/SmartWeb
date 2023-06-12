const tf = require("@tensorflow/tfjs");
tf.setBackend("cpu");

const mobilenet = require("@tensorflow-models/mobilenet");
const faceDetection = require("@tensorflow-models/face-detection");

export const createFaceDetector = async () => {
  const model = await faceDetection.createDetector(
    faceDetection.SupportedModels.MediaPipeFaceDetector,
    { runtime: "tfjs" }
  );
  return model;
};

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export async function classifyImage(url) {
  const model = await mobilenet.load();
  console.log(model);
  const img = await loadImage(url);
  const predictions = await model.classify(img);

  return predictions;
}

export function capitalize(str) {
  return str
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
}
