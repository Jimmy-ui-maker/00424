"use client";

import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import { useTranslation } from "@/context/TranslationContext";

export default function ProjectsPage() {
  const { t } = useTranslation();

  // ✅ Fetch array from translation JSON
  const projects = t("projectsList", { returnObjects: true }) || [];

  return (
    <section className="section">
      <SectionTitle
        title={t("projectsTitle")}
        subtitle={t("projectsSubtitle")}
      />
      <div className="row g-3">
        {projects.map((p, i) => (
          <div className="col-12 col-md-6 col-lg-4" key={i}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
