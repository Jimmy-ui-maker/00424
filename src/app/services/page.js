"use client";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import { useTranslation } from "@/context/TranslationContext";

export default function ServicesPage() {
  const { t } = useTranslation();

  // ✅ Fetch array from translation JSON
  const services = t("servicesList", { returnObjects: true }) || [];

  return (
    <section className="section">
      <SectionTitle title={t("servicesTitle")} subtitle={t("servicesSubtitle")} />
      <div className="row g-3">
        {services.map((s, i) => (
          <div className="col-12 col-md-6 col-lg-4" key={i}>
            <ServiceCard service={s} />
          </div>
        ))}
      </div>
    </section>
  );
}
