import SectionTitle from '@/components/SectionTitle';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/data';

export const metadata = { title: 'Projects — Jimi Yaks' };

export default function ProjectsPage() {
  return (
    <section className="section">
      <SectionTitle title="Projects" subtitle="Selected work and experiments" />
      <div className="row g-3">
        {projects.map((p) => (
          <div className="col-12 col-md-6 col-lg-4" key={p.slug}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
