"use client";
import { useTranslation } from "@/context/TranslationContext";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="navbar navbar-light bg-light sticky-top soft-shadow">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Brand */}
        <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
          <img src="/imgs/logo1.png" className="rounded-2" alt="logo" />
        </a>

        {/* Toggler for Offcanvas (only visible on small/medium screens) */}
        <button
          className="navbar-toggler shadow-none d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNav"
          aria-controls="offcanvasNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links (always visible on lg and up) */}
        <div className="d-none d-lg-flex align-items-center">
          <ul className="navbar-nav ms-auto  mb-2 mb-lg-0 d-flex flex-row gap-3">
            <li className="nav-item">
              <a className="nav-link" href="/about">
                {t("about")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/services">
                {t("services")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/projects">
                {t("projects")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/teams">
                {t("teams")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/faqs">
                {t("faqs")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                {t("contact")}
              </a>
            </li>
          </ul>

          {/* CTA button (only on lg and up) */}
          <div className="ms-3 d-none d-lg-block">
            <a className="btn btn-primary" href="/contact">
              {t("hireMe")}
            </a>
          </div>
        </div>

        {/* Offcanvas for small/medium screens */}
        <div
          className="offcanvas offcanvas-end offcanvas-custom"
          tabIndex="-1"
          id="offcanvasNav"
          aria-labelledby="offcanvasNavLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title fw-bold" id="offcanvasNavLabel">
              {t("menu") || "Menu "} 
            </h5>
            <button
              type="button"
              className="btn-close text-reset shadow-none"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav ms-auto justify-content-center align-items-center">
              <li className="nav-item ">
                <a className="nav-link" href="/about">
                  {t("about")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/services">
                  {t("services")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/projects">
                  {t("projects")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/teams">
                  {t("teams")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/faqs">
                  {t("faqs")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  {t("contact")}
                </a>
              </li>
            </ul>
            {/* Notice: No CTA button here for small screens */}
          </div>
        </div>
      </div>
    </nav>
  );
}
