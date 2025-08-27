import Link from "next/link";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";
import { projects, services, teams } from "@/lib/data";
import TeamCarousel from "@/components/TeamCarousel";
import FAQS from "@/components/FAQS";
import ContactPage from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      {/**Hero Section */}
      <Hero />
      {/**About Section */}
      <section className="section mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SectionTitle title="About me" subtitle="A quick intro" />
          <Link className="btn btn-primary soft-shadow" href="/about">
            Read more
          </Link>
        </div>
        <div className="soft-card p-4">
          <p className="lead mb-3">
            I’m Sir Jimmy — a developer who loves building practical, clean, and
            performant solutions. From full‑stack web apps to ML-flavored
            projects, I focus on shipping value.
          </p>
          <p className="mb-0">
            Tech I enjoy: Next.js, Flask, MongoDB, TensorFlow/Keras, and
            Streamlit. I’m also comfortable with Bootstrap and custom CSS for
            delightful, responsive UI.
          </p>
        </div>
      </section>
      {/**Services Section */}
      <section className="section mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <SectionTitle
            title="What I Do"
            subtitle="Tools and solutions I can deliver"
          />
          <Link className="btn btn-primary soft-shadow" href="/services">
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
          <Link className="btn btn-primary soft-shadow" href="/projects">
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
          <Link className="btn btn-primary soft-shadow" href="/faqs">
            Read More
          </Link>
        </div>
        <FAQS />
      </section>
      {/**Contact Section */}
      <ContactPage/>
    </>
  );
}
