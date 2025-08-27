import FAQS from "@/Components/FAQS";
import React from "react";
import Link from "next/link";

export default function page() {
  return (
    <>
      
      <section className="shadow-sm landing-faq mt-4 min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className=" container ">
          <div className="row justify-content-center align-content-center ">
            <div className="col-lg-6 col-md-6 col-12 text-lg-start order-2 order-lg-1">
              <div>
                <div class="text-center text-lg-start d-lg-none">
                  <a
                    href="#faq"
                    class="btn-get-started mb-4  d-inline-flex align-items-center justify-content-center align-self-center"
                  >
                    <span>Click Me</span>
                    <i class="bi bi-arrow-down"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6  col-md-6 col-12 text-lg-start text-center order-1 order-lg-1  ">
              <h1 data-aos="fade-up " data-aos-delay="500">
                Welcome to a section which answers some of your questions
              </h1>
              <h2 data-aos="fade-up" data-aos-delay="500">
                Feel free to click on the button bellow.
              </h2>
              <div data-aos="fade-up" data-aos-delay="600">
                <div class="text-center text-lg-start d-lg-block d-none">
                  <a
                    href="#faq"
                    class="btn-get-started mb-4  d-inline-flex align-items-center justify-content-center align-self-center"
                  >
                    <span>Click Me</span>
                    <i class="bi bi-arrow-down"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="faq">
        <FAQS />
      </div>
    </>
  );
}
