"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/context/TranslationContext";

export default function FAQS() {
  const { t } = useTranslation();

  return (
    <section className="section faq">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="accordion accordion-flush" id="faq-group-1">
                  {/* FAQ 1 */}
                  <div className="accordion-item rounded-top-2">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        data-bs-target="#faqsOne-1"
                        type="button"
                        data-bs-toggle="collapse"
                      >
                        {t("faq1Q")}
                      </button>
                    </h2>
                    <div
                      id="faqsOne-1"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faq-group-1"
                    >
                      <div className="accordion-body">
                        {t("faq1A")}{" "}
                        <a
                          href="mailto:jimiyaks3@gmail.com"
                          className="text-primary"
                        >
                          jimiyaks3@gmail.com
                        </a>{" "}
                        {t("faq1Or")}{" "}
                        <a href="tel:+2347010228016" className="text-primary">
                          +234 701 022 8016
                        </a>
                        .
                      </div>
                    </div>
                  </div>

                  {/* FAQ 2 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        data-bs-target="#faqsOne-2"
                        type="button"
                        data-bs-toggle="collapse"
                      >
                        {t("faq2Q")}
                      </button>
                    </h2>
                    <div
                      id="faqsOne-2"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faq-group-1"
                    >
                      <div className="accordion-body">
                        {t("faq2A")}{" "}
                        <Link href="/services" className="text-primary">
                          {t("faq2Link")}
                        </Link>
                        .
                      </div>
                    </div>
                  </div>

                  {/* FAQ 3 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        data-bs-target="#faqsOne-3"
                        type="button"
                        data-bs-toggle="collapse"
                      >
                        {t("faq3Q")}
                      </button>
                    </h2>
                    <div
                      id="faqsOne-3"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faq-group-1"
                    >
                      <div className="accordion-body">
                        {t("faq3A")}{" "}
                        <Link href="/teams" className="text-primary">
                          {t("faq3Link")}
                        </Link>
                        .
                      </div>
                    </div>
                  </div>

                  {/* FAQ 4 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        data-bs-target="#faqsOne-4"
                        type="button"
                        data-bs-toggle="collapse"
                      >
                        {t("faq4Q")}
                      </button>
                    </h2>
                    <div
                      id="faqsOne-4"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faq-group-1"
                    >
                      <div className="accordion-body">
                        {t("faq4A")}{" "}
                        <Link href="/projects" className="text-primary">
                          {t("faq4Link")}
                        </Link>
                        .
                      </div>
                    </div>
                  </div>

                  {/* FAQ 5 */}
                  <div className="accordion-item rounded-bottom-2">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        data-bs-target="#faqsOne-5"
                        type="button"
                        data-bs-toggle="collapse"
                      >
                        {t("faq5Q")}
                      </button>
                    </h2>
                    <div
                      id="faqsOne-5"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faq-group-1"
                    >
                      <div className="accordion-body">
                        {t("faq5A")}{" "}
                        <Link href="/contact" className="text-primary">
                          {t("faq5Link")}
                        </Link>
                        .
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
