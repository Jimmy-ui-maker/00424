export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-3">
      <h2 className="h3 mb-1">{title}</h2>
      {subtitle && <p className="text-secondary mb-0">{subtitle}</p>}
    </div>
  );
}
