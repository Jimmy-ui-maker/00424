"use client";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";
import { projects, services, teams } from "@/lib/data";
import TeamCarousel from "@/components/TeamCarousel";
import FAQS from "@/components/FAQS";
import ContactPage from "@/components/Contact";
import { useTranslation } from "@/context/TranslationContext";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      {/**Hero Section */}
      <Hero />

      {/**About Section */}
      <section className="section">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SectionTitle title={t("aboutTitle")} subtitle={t("aboutSubtitle")} />
          <Link className="btn text-bg-primary soft-shadow" href="/about">
            {t("readMore")}
          </Link>
        </div>
        <div className="soft-card p-4">
          <p className="lead mb-3">{t("aboutLead")}</p>
          <p className="mb-0">{t("aboutText")}</p>
        </div>
      </section>
      {/**Services Section */}
      <section className="section mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SectionTitle
            title="What I Do"
            subtitle="Tools and solutions I can deliver"
          />
          <Link className="btn text-bg-primary soft-shadow" href="/services">
            View all
          </Link>
        </div>
        <div className="row g-3">
          {services.map((s) => (
            <div className="col-12 col-md-6 col-lg-4" key={s.title}>
              <ServiceCard service={s} />
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link className="btn btn-outline-primary soft-shadow" href="/contact">
            Let&apos;s work together
          </Link>
        </div>
      </section>
      {/**Project Section */}
      <section className="section mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SectionTitle
            title="Featured Projects"
            subtitle="A quick taste of my recent work"
          />
          <Link className="btn text-bg-primary soft-shadow" href="/projects">
            View all
          </Link>
        </div>
        <div className="row g-3">
          {projects.slice(0, 3).map((p) => (
            <div className="col-12 col-md-6 col-lg-4" key={p.slug}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </section>
      {/**Team Section */}
      <section className="section mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SectionTitle
            title="Meet the Team"
            subtitle="Brilliant minds behind the work"
          />
        </div>
        <TeamCarousel />
      </section>

      {/**FAQs Section */}
      <section className="section mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SectionTitle
            title="Frequently Ask Questions"
            subtitle="Bellow are some answers to your questions"
          />
          <Link className="btn text-bg-primary soft-shadow" href="/faqs">
            Read...
          </Link>
        </div>
        <FAQS />
      </section>
      {/**Contact Section */}
      <ContactPage />
    </>
  );
}
