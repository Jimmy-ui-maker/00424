import SectionTitle from "@/components/SectionTitle";

export const metadata = { title: "About — Sir Jimmy" };

export default function AboutPage() {
  return (
    <section className="section">
      <SectionTitle title="About me" subtitle="A quick intro" />
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
  );
}
