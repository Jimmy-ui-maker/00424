"use client";

import SectionTitle from "@/components/SectionTitle";
import { useState } from "react";

const WHATSAPP_NUMBER = "2347010228016"; // without "+"

export default function ContactPage() {
  const [status, setStatus] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const message = form.get("message");
    setStatus("sending");

    // Create WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `Hi Jimi,\n\nMy name is ${name} (${email}).\n\n${message}`
    );

    // Redirect to WhatsApp
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`, "_blank");

    setTimeout(() => setStatus("sent"), 500);
  }

  return (
    <section className="section">
      <SectionTitle title="Contact" subtitle="Let’s build something great" />
      <div className="soft-card p-4">
        <form onSubmit={onSubmit} className="row g-4">
          {/* LEFT COLUMN */}
          <div className="col-12 col-md-5">
            <h3 className="h4 fw-bold mb-3">Get In Touch</h3>
            <p className="text-secondary mb-4">
              I’d love to hear about your project or idea.  
              Whether you want to build something new, improve your app,  
              or just say hello — feel free to reach out.
            </p>

            {/* WHATSAPP */}
            <div className="d-flex flex-row align-items-start gap-3">
              <i className="bi bi-whatsapp display-6 text-success"></i>
              <div>
                <h5 className="mb-1">WhatsApp</h5>
                <p className="mb-0">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-dark"
                  >
                    +234 701 022 8016
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-12 col-md-7">
            <label className="form-label">Name</label>
            <input
              name="name"
              type="text"
              required
              className=" mb-3"
              placeholder="Your name"
            />

            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              required
              className=" mb-3"
              placeholder="youremail@gmail.com"
            />

            <label className="form-label">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              className=" mb-3"
              placeholder="Tell me about your project..."
            />

            <button
              className="btn btn-success soft-shadow"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Opening WhatsApp…" : "Send via WhatsApp"}
            </button>

            {status === "sent" && (
              <span className="ms-3 text-success">
                ✅ Redirecting you to WhatsApp…
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
