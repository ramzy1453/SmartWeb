import React from "react";
import { textLimiter } from "../utils/functions";
import { Link } from "react-router-dom";
import t, { T } from "./translate";
import { useLang } from "../utils/lang_context";

export default function ApplicationCard({ data }) {
  const { name, description, image, url } = data;
  const { actualLang } = useLang();
  const isLtr = actualLang !== "ar";

  return (
    <div className="card rounded-none shadow-2xl flex cursor-pointer hover:scale-[1.02] hover:translate-y-[-1rem] transition-all">
      <figure className="flex flex-[1]">
        <img src={image} alt="Shoes" className="flex flex-1 h-64 max-w-sm" />
      </figure>
      <div className="card-body flex-[1]">
        <h2 className="card-title">{t(name)}</h2>
        <p>{textLimiter(T(description))}</p>
        <div className={`card-actions ${isLtr && "justify-end"}`}>
          <Link to={url} className="btn rounded-md btn-secondary">
            {t("main.try")}
          </Link>
        </div>
      </div>
    </div>
  );
}
