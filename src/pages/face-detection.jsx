import { useRef, useEffect, useState } from "react";
import * as faceDetection from "@tensorflow-models/face-detection";
import Webcam from "react-webcam";
import SpinLoader from "../components/SpinLoader";
import { T } from "../components/translate";

export default function FaceDetection() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const runfaceDetection = async () => {
    const faceDetector = await faceDetection.createDetector(
      faceDetection.SupportedModels.MediaPipeFaceDetector,
      { runtime: "tfjs" }
    );
    detect(faceDetector);
  };

  const detect = async (faceDetector) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;

      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const faces = await faceDetector.estimateFaces(video);
      // Clear the canvas
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, videoWidth, videoHeight);

      // Draw rectangles on the canvas
      ctx.lineWidth = 2;
      ctx.strokeStyle = "green";

      // Process the detected faces (e.g., draw rectangles)
      for (const face of faces) {
        const { xMin: x, yMin: y, width, height } = face.box;
        const cornerRadius = 10; // Adjust the corner radius as needed

        // Draw a rectangle with rounded corners
        ctx.beginPath();
        ctx.arc(
          x + cornerRadius,
          y + cornerRadius,
          cornerRadius,
          Math.PI,
          1.5 * Math.PI
        );
        ctx.arc(
          x + width - cornerRadius,
          y + cornerRadius,
          cornerRadius,
          1.5 * Math.PI,
          2 * Math.PI
        );
        ctx.arc(
          x + width - cornerRadius,
          y + height - cornerRadius,
          cornerRadius,
          0,
          0.5 * Math.PI
        );
        ctx.arc(
          x + cornerRadius,
          y + height - cornerRadius,
          cornerRadius,
          0.5 * Math.PI,
          Math.PI
        );
        ctx.closePath();
        ctx.stroke();
      }
    }
    requestAnimationFrame(() => {
      detect(faceDetector);
    });
  };
  useEffect(() => {
    runfaceDetection();
  }, []);

  return (
    <div className="h-screen">
      {loading && (
        <div className="flex justify-center items-center py-8">
          <SpinLoader text={T("loading")} />
        </div>
      )}
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
        }}
        onLoadStartCapture={() => {
          setLoading(false);
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
        }}
      />
    </div>
  );
}
