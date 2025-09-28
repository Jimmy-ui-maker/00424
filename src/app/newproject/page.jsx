"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function NewProject() {
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientCountry: "",
    projectName: "",
    type: "",
    duration: "",
    description: "",
  });

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const myInfo = {
    name: "Bala Jimmy Yakubu",
    email: "jimiyaks3@gmail.com",
    phone: "08056117572",
    country: "Nigeria",
  };

  // 🔥 Default weeks by project type
  const getDefaultWeeks = (type) => {
    switch (type) {
      case "Machine Learning":
      case "Deep Learning":
      case "Website":
        return 5;
      case "Web App":
        return 7;
      case "Mobile App":
        return 24;
      default:
        return Math.random() > 0.5 ? 2 : 3;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      const defaultWeeks = getDefaultWeeks(value);
      setForm({ ...form, type: value, duration: defaultWeeks });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const generatePrice = () => {
    let priceOptions = [];

    switch (form.type) {
      case "Machine Learning":
      case "Deep Learning":
      case "Website":
        priceOptions = [32000, 37000, 40000];
        break;
      case "Web App":
        priceOptions = [50000, 54000, 57000];
        break;
      case "Mobile App":
        priceOptions = [70000, 80000, 90000];
        break;
      default:
        priceOptions = [30000, 40000, 50000];
    }

    const randomPrice =
      priceOptions[Math.floor(Math.random() * priceOptions.length)];
    setSelectedPrice(randomPrice);
  };

  const generatePDF = async () => {
    const body = document.body;
    const oldTheme = body.classList.contains("dark-theme") ? "dark" : "light";

    // Force light mode
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");

    const input = document.getElementById("pdf-content");

    const canvas = await html2canvas(input, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = 297;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${form.projectName || "project"}_price.pdf`);

    // Restore theme
    body.classList.remove("light-theme");
    if (oldTheme === "dark") body.classList.add("dark-theme");
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Project Price Generator</h2>

      <div className="row justify-content-center ">
        <div className="col-md-12 col-sm-12">
          <div className="card p-4 shadow rounded">
            {/* Client Info */}
            <div className="mb-3">
            <div className="d-flex justify-content-center">
              <label className="form-label">Client Name</label>
              </div>
              <input
                type="text"
                className=" text-center"
                name="clientName"
                list="clients"
                value={form.clientName}
                onChange={handleChange}
              
              />
              <datalist id="clients">
                <option value="Bala Jimmy Yakubu" />
                <option value="Jane Smith" />
                <option value="Michael Johnson" />
              </datalist>
            </div>
            <div className="mb-3">
            <div className="d-flex justify-content-center">
              <label className="form-label">Client Email</label>
              </div>
              <input
                className=" text-center"
                type="text"
                name="clientEmail"
                value={form.clientEmail}
                onChange={handleChange}
              
              />
            </div>
            <div className="mb-3">
            <div className="d-flex justify-content-center">
              <label className="form-label">Client Phone</label>
              </div>
              <input
                className=" text-center"
                name="clientPhone"
                type="text"
                value={form.clientPhone}
                onChange={handleChange}
              
              />
            </div>
            <div className="mb-3">
            <div className="d-flex justify-content-center">
              <label className="form-label">Client Country</label>
              </div>
              <input
                className=" text-center"
                type="text"
                name="clientCountry"
                value={form.clientCountry}
                onChange={handleChange}
               
              />
            </div>
            {/* Project Info */}
            <div className="mb-3">
              <div className="d-flex justify-content-center">
                <label className="form-label">Project Type</label>
              </div>
              <select
                className=" text-center"
                name="type"
                type="select"
                value={form.type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Website">Website</option>
                <option value="Web App">Web App</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Deep Learning">Deep Learning</option>
              </select>
            </div>
            <div className="mb-3">
            <div className="d-flex justify-content-center">
              <label className="form-label">Project Name</label>
              </div>
              <input
                className=" text-center"
                type="text"
                name="projectName"
                value={form.projectName}
                onChange={handleChange}
              
              />
            </div>
            <div className="mb-3">
            <div className="d-flex justify-content-center">
              <label className="form-label">Duration (weeks)</label>
              </div>
              <input
                className=" text-center"
                type="number"
                name="duration"
                value={form.duration}
                disabled={!!form.type} // disable if project type is selected
                onChange={handleChange}
              
              />
            </div>
            <div className="mb-3">
            <div className="d-flex justify-content-center">
              <label className="form-label ">Project Description</label>
              </div>
              <textarea
                className=" text-center"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
              
              ></textarea>
            </div>
            <div className="d-grid gap-2 mb-3">
              <button className="btn btn-primary" onClick={generatePrice}>
                Generate Price
              </button>
            </div>
            <div className="d-grid text-center gap-2 mb-3">
              <strong>Agreed Price:</strong> ₦{selectedPrice?.toLocaleString()}
            </div>

            {/* PDF Preview */}
            {selectedPrice && (
              <div id="pdf-preview-container">
                <div id="pdf-content" className="pdf-wrapper light-theme">
                  <div className="pdf-watermark">SIR JIMMY</div>
                  <div className="pdf-logo">
                    <img src="/imgs/logo1.png" alt="logo" />
                  </div>
                  <div className="pdf-header">Project Proposal & Pricing</div>
                  <div className="pdf-date">
                    Date: {new Date().toLocaleDateString()}
                  </div>

                  {/* My Info */}
                  <div className="pdf-myinfo">
                    <h5>My Information</h5>
                    <div className="info-row">
                      <strong>Name:</strong> <span>{myInfo.name}</span>
                    </div>
                    <div className="info-row">
                      <strong>Email:</strong> <span>{myInfo.email}</span>
                    </div>
                    <div className="info-row">
                      <strong>Phone:</strong> <span>{myInfo.phone}</span>
                    </div>
                    <div className="info-row">
                      <strong>Country:</strong> <span>{myInfo.country}</span>
                    </div>
                  </div>

                  <div className="pdf-divider" />

                  {/* Client Info */}
                  <div className="pdf-client">
                    <h5>Client Information</h5>
                    <div className="info-row">
                      <strong>Name:</strong> <span>{form.clientName} </span>
                    </div>
                    <div className="info-row">
                      <strong>Email:</strong> <span>{form.clientEmail}</span>
                    </div>
                    <div className="info-row">
                      <strong>Phone:</strong> <span>{form.clientPhone}</span>
                    </div>
                    <div className="info-row">
                      <strong>Country:</strong>
                      <span>{form.clientCountry}</span>
                    </div>
                  </div>

                  <div className="pdf-divider" />

                  {/* Project Info */}
                  <div className="pdf-project">
                    <h5>Project Details</h5>
                    <div className="info-row">
                      <strong>Type:</strong> <span>{form.type}</span>
                    </div>
                    <div className="info-row">
                      <strong>Project Name:</strong>{" "}
                      <span>{form.projectName}</span>
                    </div>
                    <div className="info-row">
                      <strong>Duration:</strong>{" "}
                      <span>{form.duration} weeks</span>
                    </div>
                    <div className="info-row">
                      <strong>Agreed Price:</strong>{" "}
                      <span>₦{selectedPrice?.toLocaleString()}</span>
                    </div>

                    <div className="description-block">
                      <strong>Description:</strong>
                      <p>{form.description}</p>
                    </div>
                  </div>

                  <div className="pdf-divider" />

                  {/* Signatures */}
                  <div className="pdf-signatures">
                    <div>
                      <p>Owner Signature</p>
                      <strong>{myInfo.name}</strong>
                    </div>
                    <div>
                      <p>Client Signature</p>
                      {form.clientName}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Terms Agreement */}
            {selectedPrice && (
              <div className="form-check mt-4">
                <input
                  className="form-check-input shadow-none"
                  type="checkbox"
                  id="termsCheck"
                  checked={termsAgreed}
                  onChange={() => setTermsAgreed(!termsAgreed)}
                />
                <label className="form-check-label" htmlFor="termsCheck">
                  I agree to the terms and conditions.
                </label>
              </div>
            )}

            {/* Download PDF */}
            {selectedPrice && termsAgreed && (
              <div className="d-grid gap-2 mt-3">
                <button className="btn btn-dark" onClick={generatePDF}>
                  Download PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
