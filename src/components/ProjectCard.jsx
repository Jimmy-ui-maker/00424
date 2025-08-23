import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ project }) {
  return (
    <div className="card h-100 soft-shadow">
      <div className="ratio ratio-16x9 rounded-top overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="card-body">
        <h3 className="h5 mb-1">{project.title}</h3>
        <p className="text-secondary small mb-2">{project.tagline}</p>
        <p className="mb-3">{project.short}</p>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} className="badge text-bg-light border">
              {s}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="btn btn-outline-primary soft-shadow"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
