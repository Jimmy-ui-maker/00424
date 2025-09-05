"use client";
import { useTranslation } from "@/context/TranslationContext";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="navbar navbar-expand-lg sticky-top soft-shadow">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          Sir Jimmy
        </a>
        <button
          className="navbar-toggler shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="/about">{t("about")}</a></li>
            <li className="nav-item"><a className="nav-link" href="/services">{t("services")}</a></li>
            <li className="nav-item"><a className="nav-link" href="/projects">{t("projects")}</a></li>
            <li className="nav-item"><a className="nav-link" href="/teams">{t("teams")}</a></li>
            <li className="nav-item"><a className="nav-link" href="/faqs">{t("faqs")}</a></li>
            <li className="nav-item"><a className="nav-link" href="/contact">{t("contact")}</a></li>
          </ul>
          <div className="d-none d-lg-block ms-3">
            <a className="btn text-bg-primary soft-shadow" href="/contact">
              {t("hireMe")}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
