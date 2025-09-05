"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/context/TranslationContext";

export default function Footer() {
  const year = new Date().getFullYear();
  const [showModal, setShowModal] = useState(null);
  const { t } = useTranslation();

  const handleClose = () => setShowModal(null);
  const handleShow = (type) => setShowModal(type);

  return (
    <>
      <footer className="py-4 mt-5">
        <div className="container">
          <div className="soft-card p-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            {/* Left - Copyright */}
            <div className="small text-center text-md-start">
              © {year} <strong>Sir Jimmy</strong>. {t("rights")}
            </div>

            {/* Center - Policies */}
            <div className="soft-card px-3 py-2 d-flex align-items-center gap-3 shadow-sm">
              <button
                className="btn py-1 d-flex align-items-center gap-1"
                onClick={() => handleShow("privacy")}
              >
                <i className="bi bi-shield-lock"></i> {t("privacyPolicy")}
              </button>
              <button
                className="btn py-1 d-flex align-items-center gap-1"
                onClick={() => handleShow("terms")}
              >
                <i className="bi bi-file-earmark-text"></i> {t("terms")}
              </button>
            </div>

            {/* Right - Scroll to top */}
            <div className="soft-card px-2 p-2 gap-1">
              <Link href="#" className="rounded-5 p-3">
                <i className="bi bi-arrow-up"></i>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Fullscreen Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-fullscreen" role="document">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title">
                  {showModal === "privacy" ? t("privacyPolicy") : t("terms")}
                </h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                {showModal === "privacy" && (
                  <div>
                    <p>{t("privacyText1")}</p>
                    <p>{t("privacyText2")}</p>
                    <p>{t("privacyText3")}</p>
                    <p>{t("privacyText4")}</p>
                  </div>
                )}
                {showModal === "terms" && (
                  <div>
                    <p>{t("termsText1")}</p>
                    <ul>
                      <li>{t("termsList1")}</li>
                      <li>{t("termsList2")}</li>
                      <li>{t("termsList3")}</li>
                      <li>{t("termsList4")}</li>
                    </ul>
                    <p>{t("termsText2")}</p>
                  </div>
                )}
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-light" onClick={handleClose}>
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
}
