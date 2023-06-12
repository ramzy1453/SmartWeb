import { useState } from "react";
import c from "classnames";
import useMediaQuery from "../hooks/useMediaQuery";
import t from "./translate";

export default function Modal({ showModal, openModal, closeModal, children }) {
  const { isXs } = useMediaQuery();
  return (
    <dialog
      id="my_modal_1"
      className={c("modal modal-middle w-full h-full", {
        "modal-open": showModal,
      })}
    >
      <form method="dialog" className="modal-box p-8">
        {children}
        <div className="modal-action">
          {isXs ? (
            <button
              onClick={closeModal}
              htmlFor="my_modal_1"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          ) : (
            <button className="btn" onClick={closeModal}>
              {t("close")}
            </button>
          )}
        </div>
      </form>
    </dialog>
  );
}
