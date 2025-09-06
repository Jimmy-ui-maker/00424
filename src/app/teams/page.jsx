"use client";
import SectionTitle from "@/components/SectionTitle";
import TeamCarousel from "@/components/TeamCarousel";
import { useTranslation } from "@/context/TranslationContext";
import React from "react";

export default function page() {
  const { t } = useTranslation();
  return (
    <section className="section mt-5 ">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <SectionTitle title={t("teamsTitle")} subtitle={t("teamsSubtitle")} />
      </div>
      <TeamCarousel />
    </section>
  );
}
