"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionTitle from "@/components/SectionTitle";
import { useTranslation } from "@/context/TranslationContext";

export default function ProjectDetail({ params }) {
  const { t } = useTranslation();

  // ✅ Fetch projects from translation JSON
  const projects = t("projectsList", { returnObjects: true }) || [];
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) return notFound();

  return (
    <section className="section">
      <SectionTitle title={project.title} subtitle={project.tagline} />
      <div className="soft-card p-4">
        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <p className="mb-3">{project.description}</p>
            <ul className="list-inline">
              {project.stack.map((s, i) => (
                <li
                  key={i}
                  className="list-inline-item badge text-bg-light border me-2 mb-2"
                >
                  {s}
                </li>
              ))}
            </ul>
            {project.links?.demo && (
              <a
                className="btn btn-primary me-2 soft-shadow"
                href={project.links.demo}
                target="_blank"
              >
                {t("liveDemo") || "Live Demo"}
              </a>
            )}
            {project.links?.repo && (
              <a
                className="btn btn-outline-primary soft-shadow"
                href={project.links.repo}
                target="_blank"
              >
                {t("sourceCode") || "Source Code"}
              </a>
            )}
            <Link href="/projects" className="btn btn-link d-block mt-3 p-0">
              ← {t("backToProjects") || "Back to projects"}
            </Link>
          </div>
          <div className="col-12 col-lg-5">
            <div className="ratio ratio-4x3 soft-card overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
