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
          
        </div>
        <FAQS />
      </section>
    </>
  );
}
