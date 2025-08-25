import SectionTitle from "@/components/SectionTitle";
import TeamCarousel from "@/components/TeamCarousel";
import React from "react";

export default function page() {
  return (
    <section className="section mt-5 ">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <SectionTitle
          title="Meet the Team"
          subtitle="Brilliant minds behind the work"
        />
      </div>
      <TeamCarousel />
    </section>
  );
}
