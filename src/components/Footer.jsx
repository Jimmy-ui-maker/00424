"use client";
import { useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const [showModal, setShowModal] = useState(null); // "privacy" | "terms" | null

  const handleClose = () => setShowModal(null);
  const handleShow = (type) => setShowModal(type);

  return (
    <>
      <footer className="py-4 mt-5">
        <div className="container">
          <div className="soft-card p-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            {/* Left - Copyright */}
            <div className="small text-center text-md-start">
              © {year} <strong>Jimi Yaks</strong>. All rights reserved.
            </div>

            {/* Center - Policies (with shadow like WhatsApp) */}
            <div className="soft-card px-3 py-2 d-flex align-items-center gap-3 shadow-sm">
              <button
                className="btn  py-1 text-decoration-none d-flex align-items-center gap-1"
                onClick={() => handleShow("privacy")}
              >
                <i className="bi bi-shield-lock"></i> Privacy Policy
              </button>
              <button
                className="btn  py-1 text-decoration-none d-flex align-items-center gap-1"
                onClick={() => handleShow("terms")}
              >
                <i className="bi bi-file-earmark-text"></i> Terms & Conditions
              </button>
            </div>

            {/* Right - WhatsApp */}
            <div className="soft-card p-3   gap-1">
              <a href="" className=" rounded-5 bg-body-secondary p-3 ">
                <i className="text-muted bi bi-arrow-up"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Fullscreen Modals */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-fullscreen" role="document">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title">
                  {showModal === "privacy"
                    ? "Privacy Policy"
                    : "Terms & Conditions"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                {showModal === "privacy" && (
                  <div>
                    <h6>Privacy Policy</h6>
                    <p>
                      At <strong>Sir Jimmy</strong>, we value your privacy. This
                      website does not collect personal information beyond what
                      you choose to provide (for example, when contacting us via
                      email or WhatsApp).
                    </p>
                    <p>
                      We may use cookies and similar technologies to improve
                      user experience (such as saving your dark mode settings or
                      remembering your widget preferences). No personal data is
                      sold or shared with third parties.
                    </p>
                    <p>
                      External links (e.g., WhatsApp, email, GitHub) may direct
                      you to other websites that are not under our control. We
                      encourage you to review their privacy practices
                      separately.
                    </p>
                    <p>
                      By using this site, you agree to the use of cookies and
                      the handling of limited non-personal data to enhance your
                      experience.
                    </p>
                  </div>
                )}
                {showModal === "terms" && (
                  <div>
                    <h6>Terms and Conditions</h6>
                    <p>
                      Welcome to <strong>Sir Jimmy</strong>. By using this
                      website, you agree to the following terms:
                    </p>
                    <ul>
                      <li>
                        The content provided is for informational and showcase
                        purposes only.
                      </li>
                      <li>
                        Features such as dark mode, music playback, and
                        draggable widgets are offered “as is” without warranties
                        of any kind.
                      </li>
                      <li>
                        We are not responsible for issues arising from
                        third-party links (e.g., WhatsApp, email, GitHub).
                      </li>
                      <li>
                        You agree not to misuse or attempt to disrupt the
                        functionality of this website.
                      </li>
                    </ul>
                    <p>
                      We reserve the right to update these Terms and Conditions
                      at any time. Continued use of the site after changes
                      implies acceptance.
                    </p>
                  </div>
                )}
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={handleClose}
                >
                  Close
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
