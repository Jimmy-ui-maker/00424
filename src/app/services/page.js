import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/lib/data';

export const metadata = { title: 'Services — Jimi Yaks' };

export default function ServicesPage() {
  return (
    <section className="section">
      <SectionTitle title="Services" subtitle="How I can help you" />
      <div className="row g-3">
        {services.map((s) => (
          <div className="col-12 col-md-6 col-lg-4" key={s.title}>
            <ServiceCard service={s} />
          </div>
        ))}
      </div>
    </section>
  );
}
