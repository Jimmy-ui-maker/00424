export default function ServiceCard({ service }) {
  return (
    <div className="card h-100 soft-shadow">
      <div className="card-body">
        <div className="d-flex align-items-center gap-3 mb-2">
          <div className="rounded-circle p-3 bg-light soft-shadow">
            {service.emoji}
          </div>
          <h3 className="h5 mb-0">{service.title}</h3>
        </div>
        <p className="mb-2">{service.description}</p>
        <ul className="small text-secondary ps-3 mb-0">
          {service.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
