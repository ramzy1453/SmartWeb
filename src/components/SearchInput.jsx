import React from "react";
import { FiSearch } from "react-icons/fi";
import { T } from "./translate";
import { useLang } from "../utils/lang_context";

export default function SearchInput({ search, onSearchChange }) {
  const { actualLang } = useLang();
  const isRtl = actualLang === "ar";
  return (
    <div
      className={`form-control w-full max-w-xs relative ${isRtl ? "rtl" : ""}`}
    >
      <button
        className={`btn btn-ghost ${
          isRtl ? "rounded-r-none" : "rounded-l-none"
        } absolute ${isRtl ? "right-0" : "left-0"}`}
      >
        <FiSearch />
      </button>
      <input
        type="text"
        placeholder={T("main.search")}
        className={`input input-bordered w-full max-w-xs ${
          isRtl ? "pr-12" : "pl-12"
        }`}
        value={search}
        onChange={onSearchChange}
      />
    </div>
  );
}
