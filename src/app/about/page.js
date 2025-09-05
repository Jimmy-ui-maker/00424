"use client";

import SectionTitle from "@/components/SectionTitle";
import { useTranslation } from "@/context/TranslationContext";

//export const metadata = { title: "About — Sir Jimmy" };

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <section className="section">
      <SectionTitle title={t("aboutTitle")} subtitle={t("aboutSubtitle")} />
      <div className="soft-card p-4">
        <p className="lead mb-3">{t("aboutLead")}</p>
        <p className="mb-0">{t("aboutText")}</p>
      </div>
    </section>
  );
}
