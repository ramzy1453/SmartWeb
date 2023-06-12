import { useState } from "react";
import { isin } from "../utils/functions";
import BmiBar from "../components/BmiBar";
import t, { T } from "../components/translate";

export default function Bmi() {
  const [height, setHeight] = useState(100);
  const [weight, setWeight] = useState(100);

  const computeBmi = () => (weight / (height * height)) * 10000;

  const bmiStatus = () => {
    const bmi = computeBmi();
    if (bmi < 16) {
      return "status-severaly-underweight";
    } else if (isin(16, 17, "in_in")(bmi)) {
      return "status-moderately-underweight";
    } else if (isin(17, 18.5, "in_in")(bmi)) {
      return "status-mildly-underweight";
    } else if (isin(18.5, 25, "in_in")(bmi)) {
      return "status-normal";
    } else if (isin(25, 30, "in_in")(bmi)) {
      return "status-overweight";
    } else if (isin(30, 35, "in_in")(bmi)) {
      return "status-obese-class-i";
    } else if (isin(35, 40, "in_in")(bmi)) {
      return "status-obese-class-ii";
    } else if (bmi >= 40) {
      return "status-obese-class-iii";
    }
  };
  const bmiColor = () => {
    const status = bmiStatus();
    switch (status) {
      case "status-severaly-underweight":
        return "text-red-500";
      case "status-moderately-underweight":
        return "text-yellow-500";
      case "status-mildly-underweight":
        return "text-yellow-500";
      case "status-normal":
        return "text-green-500";
      case "status-overweight":
        return "text-yellow-500";
      case "status-obese-class-i":
        return "text-red-500";
      case "status-obese-class-ii":
        return "text-red-600";
      case "status-obese-class-iii":
        return "text-red-800";
      default:
        return "text-black";
    }
  };

  return (
    <div
      className="flex flex-col justify-center"
      style={{ height: "calc(100vh - 128px)" }}
    >
      <div className="flex flex-col space-y-12 lg:w-[70%] lg:mx-auto">
        <BmiBar
          labelWithGrandeur={T("weight")}
          value={weight}
          setValue={setWeight}
          min={10}
          max={500}
        />
        <BmiBar
          labelWithGrandeur={T("height")}
          value={height}
          setValue={setHeight}
          min={50}
          max={300}
        />
        <div className={`text-lg md:text-2xl my-2 text-center ${bmiColor()}`}>
          <h1 className="text-center">
            {t("bmi")} : {computeBmi().toFixed(2)}
          </h1>
          <h1 className="text-center">
            {t("status")} : {t(bmiStatus())}
          </h1>
        </div>
      </div>
    </div>
  );
}
