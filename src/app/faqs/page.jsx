import FAQS from "@/components/FAQS";
import SectionTitle from "@/components/SectionTitle";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
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
    </>
  );
}
