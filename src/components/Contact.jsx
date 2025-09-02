"use client";

import SectionTitle from "@/components/SectionTitle";
import { useState } from "react";

const WHATSAPP_NUMBER = "2347010228016"; // without "+"

export default function ContactPage() {
  const [status, setStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("new"); // "new" | "improve" | "hello"

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const project = form.get("project");
    const message = form.get("message");
    setStatus("sending");

    // WhatsApp text
    let whatsappMessage = `Hi Jimi,\n\nMy name is ${name}.`;
    if (project) whatsappMessage += `\nProject: ${project}`;
    whatsappMessage += `\n\n${message}`;

    // Encode
    whatsappMessage = encodeURIComponent(whatsappMessage);

    // Redirect to WhatsApp
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`,
      "_blank"
    );

    setTimeout(() => setStatus("sent"), 500);
  }

  return (
    <section className="section mt-4">
      <SectionTitle title="Contact" subtitle="Let’s build something great" />
      <div className="soft-card p-4">
        <form onSubmit={onSubmit} className="row g-4">
          {/* LEFT COLUMN */}
          <div className="col-12 col-md-5">
            <h3 className="h4 fw-bold mb-3">Get In Touch</h3>
            <p className=" mb-5">
              I’d love to hear about your project or idea. Whether you want to
              build something new, improve your app, or just say hello — feel
              free to reach out.
            </p>

            {/* Contact */}
            <div className="d-flex flex-row align-items-start gap-3 mb-3">
              <i className="bi bi-telephone display-6 text-primary"></i>
              <div>
                <h5 className="mb-1">Phone Number</h5>
                <p className="mb-0">
                  <a
                    href="tel:+2347010228016"
                    className=" text-decoration-none "
                  >
                    +234 701 022 8016
                  </a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="d-flex flex-row align-items-start gap-3 mb-3">
              <i className="bi bi-envelope-at display-6 text-danger"></i>
              <div>
                <h5 className="mb-1">Email Address</h5>
                <p className="mb-0">
                  <a
                    href="mailto:jimiyaks3@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none "
                  >
                    jimiyaks3@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* WHATSAPP */}
            <div className="d-flex flex-row align-items-start gap-3 mb-3">
              <i className="bi bi-whatsapp display-6 text-success"></i>
              <div>
                <h5 className="mb-1">WhatsApp</h5>
                <p className="mb-0">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none "
                  >
                    +234 701 022 8016
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-12 col-md-7">
            {/* Tabs */}
            <ul className="nav nav-tabs mb-4 justify-content-lg-start justify-content-center">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${activeTab === "new" ? "active" : ""}`}
                  onClick={() => setActiveTab("new")}
                >
                  <i className="bi bi-plus-circle d-sm-none"></i>
                  <span className="d-none d-sm-inline"> New Project</span>
                </button>
              </li>

              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${
                    activeTab === "improve" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("improve")}
                >
                  <i className="bi bi-arrow-repeat d-sm-none"></i>
                  <span className="d-none d-sm-inline"> Improve</span>
                </button>
              </li>

              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${
                    activeTab === "hello" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("hello")}
                >
                  <i className="bi bi-chat-dots d-sm-none"></i>
                  <span className="d-none d-sm-inline"> Hello</span>
                </button>
              </li>
            </ul>

            {/* Dynamic Tab Heading */}
            <h4 className="fw-bold mb-3">
              {activeTab === "new" && "Start a New Project"}
              {activeTab === "improve" && "Improve Your App"}
              {activeTab === "hello" && "Just Say Hello"}
            </h4>

            {/* Form Inputs */}
            <label className="form-label">Your Name</label>
            <input
              name="name"
              type="text"
              required
              className=" mb-3"
              placeholder="Your name"
            />

            {/* Show Project Name if not Hello */}
            {activeTab !== "hello" && (
              <>
                <label className="form-label">Project Name</label>
                <input
                  name="project"
                  type="text"
                  required
                  className=" mb-3"
                  placeholder="Project title"
                />
              </>
            )}

            <label className="form-label">Message</label>
            <textarea
              name="message"
              rows={4}
              required
              className=" mb-3"
              placeholder={
                activeTab === "hello"
                  ? "Just say hello..."
                  : "Tell me about your project..."
              }
            />

            {/* File upload NOTE instead of input */}
            {activeTab !== "hello" && (
              <p className="text-muted small">
                📎 You can attach files directly in WhatsApp after the chat opens.
              </p>
            )}

            <button
              className="btn text-bg-success soft-shadow"
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
