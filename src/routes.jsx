import React from "react";
import { useRoutes } from "react-router-dom";

import Home from "./pages";
import NotFound from "./pages/404";
import ImageClassification from "./pages/image-classification";
import FaceDetection from "./pages/face-detection";
import SentimentAnalysis from "./pages/sentiment-analysis";
import LanguageDetection from "./pages/langage-detection";
import Bmi from "./pages/bmi";
import Text2Speech from "./pages/text2speech";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/image-classification",
      element: <ImageClassification />,
    },
    {
      path: "/face-detection",
      element: <FaceDetection />,
    },
    {
      path: "/sentiment-analysis",
      element: <SentimentAnalysis />,
    },
    {
      path: "/language-detection",
      element: <LanguageDetection />,
    },
    {
      path: "/bmi",
      element: <Bmi />,
    },
    {
      path: "/text2speech",
      element: <Text2Speech />,
    },
  ]);
}
