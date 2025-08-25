"use client";
import SectionTitle from "@/components/SectionTitle";
import { useState } from "react";

const CONTACT_EMAIL = "jimiyaks3@example.com"; // <-- change this

export default function ContactPage() {
  const [status, setStatus] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const message = form.get("message");
    setStatus("sending");

    // Simple mailto fallback (no backend yet)
    const body = encodeURIComponent(
      `Hi Jimi,\n\n${message}\n\nFrom: ${name} <${email}>`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      "Portfolio Contact"
    )}&body=${body}`;
    setTimeout(() => setStatus("sent"), 500);
  }

  return (
    <section className="section">
      <SectionTitle title="Contact" subtitle="Let’s build something great" />
      <div className="soft-card p-4">
        <form onSubmit={onSubmit} className="row g-3">
          <div className="col-12 col-md-6 ">
            <p className="">Get In Touch</p>
            <hr />
            <p>
              
            </p>
            <div className=" d-flex flex-row gap-4 ">
              <i className=" bi bi-envelope-at display-4 text-primary"></i>
              <div className=" d-flex flex-column">
                <h4 className=" pb-0"> Email</h4>
                <p className=" pt-0" >jimiyaks3@gmail.com</p>
              </div>
            </div>
            <div className=" d-flex flex-row gap-4 ">
              <i className=" bi bi-telephone display-4 text-primary"></i>
              <div className=" d-flex flex-column">
                <h4 className=" pb-0"> Contact</h4>
                <p className=" pt-0" >+234 701 022 8016</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">Name</label>
            <input
              name="name"
              type="text"
              required
              className="  "
              placeholder="Your name"
            />
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              required
              className="  "
              placeholder="youremail@gmail.com"
            />
            <label className="form-label">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              className="  "
              placeholder="Tell me about your project..."
            />
            <button
              className="btn btn-primary soft-shadow"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "sent" && (
              <span className="align-self-center text-success">
                Thanks! Your email client should open.
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
