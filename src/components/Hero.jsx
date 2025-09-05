"use client";

import Link from "next/link";
import { useTranslation } from "@/context/TranslationContext";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="section mt-4">
      <div className="soft-card p-4 p-md-5">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-7">
            <h1 className="display-5 fw-bold mb-2">
              {t("heroGreeting")} <span className="text-primary">Sir Jimmy</span>.
            </h1>
            
            <p className="lead mb-4">{t("heroDescription")}</p>
            <div className="d-grid d-sm-flex gap-2">
              <Link
                href="/projects"
                className="btn text-bg-primary btn-lg soft-shadow"
              >
                {t("viewProjects")}
              </Link>
              <Link
                href="/contact"
                className="btn btn-outline-primary btn-lg soft-shadow"
              >
                {t("contactMe")}
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="ratio ratio-1x1 rounded-4 overflow-hidden soft-shadow">
              <img
                src="/imgs/jimi.jpg"
                alt="Avatar"
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
