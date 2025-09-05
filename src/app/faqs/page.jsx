"use client";

import FAQS from "@/components/FAQS";
import SectionTitle from "@/components/SectionTitle";
import Link from "next/link";
import React from "react";
import { useTranslation } from "@/context/TranslationContext";

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <section className="section mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SectionTitle title={t("faqTitle")} subtitle={t("faqSubtitle")} />
        </div>
        <FAQS />
      </section>
    </>
  );
}
