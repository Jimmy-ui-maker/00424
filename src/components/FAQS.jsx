import React from "react";
import Link from "next/link";

export default function FAQS() {
  return (
    <section className="section faq">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="accordion accordion-flush" id="faq-group-1">
                  
                  {/* FAQ 1 */}
                  <div className="accordion-item rounded-top-2">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        data-bs-target="#faqsOne-1"
                        type="button"
                        data-bs-toggle="collapse"
                      >
                        How can I contact you directly?
                      </button>
                    </h2>
                    <div
                      id="faqsOne-1"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faq-group-1"
                    >
                      <div className="accordion-body">
                        You can reach me via email at{" "}
                        <a href="mailto:jimiyaks3@gmail.com" className="text-primary">
                          jimiyaks3@gmail.com
                        </a>
                        or call me directly at
                        <a href="tel:+2347010228016" className="text-primary">
                          +234 701 022 8016
                        </a>
                        . I’ll get back to you as soon as possible.
                      </div>
                    </div>
                  </div>

                  {/* FAQ 2 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        data-bs-target="#faqsOne-2"
                        type="button"
                        data-bs-toggle="collapse"
                      >
                        What kind of services do you offer?
                      </button>
                    </h2>
                    <div
                      id="faqsOne-2"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faq-group-1"
                    >
                      <div className="accordion-body">
                        I provide a range of services including
                        <strong>Full-Stack Development, UI/UX Design, Data Science, and DevOps</strong>.  
                        My goal is to build intelligent, scalable, and user-friendly solutions.  
                        Check out the
                        <Link href="/services" className="text-primary">
                          Services page
                        </Link>
                        for more details.
                      </div>
                    </div>
                  </div>

                  {/* FAQ 3 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        data-bs-target="#faqsOne-3"
                        type="button"
                        data-bs-toggle="collapse"
                      >
                        Do you work alone or with a team?
                      </button>
                    </h2>
                    <div
                      id="faqsOne-3"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faq-group-1"
                    >
                      <div className="accordion-body">
                        I collaborate with a talented team of professionals including{" "}
                        <strong>developers, designers, data scientists, and architects</strong>.  
                        Each member brings unique expertise to deliver the best results.  
                        Meet them on the{" "}
                        <Link href="/teams" className="text-primary">
                          Team page
                        </Link>
                        .
                      </div>
                    </div>
                  </div>

                  {/* FAQ 4 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        data-bs-target="#faqsOne-4"
                        type="button"
                        data-bs-toggle="collapse"
                      >
                        Can I see examples of your past work?
                      </button>
                    </h2>
                    <div
                      id="faqsOne-4"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faq-group-1"
                    >
                      <div className="accordion-body">
                        Absolutely! I’ve worked on several exciting projects ranging from{" "}
                        <strong>web applications</strong> to{" "}
                        <strong>AI-powered solutions</strong>.  
                        Visit the{" "}
                        <Link href="/projects" className="text-primary">
                          Projects page
                        </Link>{" "}
                        to explore case studies and featured works.
                      </div>
                    </div>
                  </div>

                  {/* FAQ 5 */}
                  <div className="accordion-item rounded-bottom-2">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        data-bs-target="#faqsOne-5"
                        type="button"
                        data-bs-toggle="collapse"
                      >
                        How soon can we start working together?
                      </button>
                    </h2>
                    <div
                      id="faqsOne-5"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faq-group-1"
                    >
                      <div className="accordion-body">
                        I’m always open to new opportunities! The timeline depends on the{" "}
                        <strong>scope of your project</strong>.  
                        Send me a quick message through the{" "}
                        <Link href="/contact" className="text-primary">
                          Contact page
                        </Link>{" "}
                        and we can discuss details right away.
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
