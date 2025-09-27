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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePrice = () => {
    const base = parseInt(form.duration) || 1;
    const price = Math.round((Math.random() * 100 + 50) * base * 1000);
    setSelectedPrice(price);
  };

  const generatePDF = async () => {
    const input = document.getElementById("pdf-content");
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${form.projectName || "project"}_price.pdf`);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Project Price Generator</h2>

      <div className="row justify-content-center">
        <div className="col-md-8 col-sm-12">
          <div className="card p-4 shadow rounded">
            {/* Client Info */}
            <div className="mb-3">
              <label className="form-label">Client Name</label>
              <input
                type="text"
                className=""
                name="clientName"
                list="clients"
                value={form.clientName}
                onChange={handleChange}
                placeholder="Bala Jimmy Yakubu"
              />
              <datalist id="clients">
                <option value="Bala Jimmy Yakubu" />
                <option value="Jane Smith" />
                <option value="Michael Johnson" />
              </datalist>
            </div>

            <div className="mb-3">
              <label className="form-label">Client Email</label>
              <input
                className=""
                type="text"
                name="clientEmail"
                value={form.clientEmail}
                onChange={handleChange}
                placeholder="jimiyaks3@gmail.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Client Phone</label>
              <input
                className=""
                name="clientPhone"
                type="text"
                value={form.clientPhone}
                onChange={handleChange}
                placeholder="08056117572"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Client Country</label>
              <input
                className=""
                type="text"
                name="clientCountry"
                value={form.clientCountry}
                onChange={handleChange}
                placeholder="Nigeria"
              />
            </div>

            {/* Project Info */}
            <div className="mb-3">
              <label className="form-label">Project Type</label>
              <select
                className=""
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
              <label className="form-label">Project Name</label>
              <input
                className=""
                type="text"
                name="projectName"
                value={form.projectName}
                onChange={handleChange}
                placeholder="Awesome Project"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Duration (weeks)</label>
              <input
                className=""
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="2"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Project Description</label>
              <textarea
                className=""
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your project..."
              ></textarea>
            </div>

            <div className="d-grid gap-2 mb-3">
              <button className="btn btn-primary" onClick={generatePrice}>
                Generate Price
              </button>
            </div>

            {/* PDF Preview */}
            {selectedPrice && (
              <div
                id="pdf-content"
                className="p-4 mt-5 rounded position-relative"
                style={{
                  background: "#e0e5ec", // PDF light background
                  fontFamily: "Arial, sans-serif",
                  maxWidth: "800px",
                  margin: "0 auto",
                  padding: "40px",
                  minHeight: "1120px",
                  border: "3px solid #24364a",
                  borderRadius: "16px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  position: "relative",
                  color: "#24364a", // text color for PDF
                }}
              >
                {/* Logo */}
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "25px",
                    background: "linear-gradient( #24364a 0%, #e0e5ec 100%)",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src="/imgs/logo1.png"
                    alt="logo"
                    width={100}
                    style={{
                      marginBottom: "10px",
                      minHeight: "120px",
                      minWidth: "200px",
                    }}
                  />
                </div>

                {/* Header Box */}
                <div
                  style={{
                    background:
                      "linear-gradient(90deg, #1c2a3b 0%, #24364a 100%)",
                    color: "#fff",
                    textAlign: "center",
                    padding: "15px 0",
                    borderRadius: "8px",
                    marginBottom: "30px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                  }}
                >
                  Project Proposal & Pricing
                </div>

                {/* Date */}
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Date: {new Date().toLocaleDateString()}
                </div>

                {/* My Info */}
                <div style={{ textAlign: "center", marginBottom: "25px" }}>
                  <p>
                    <strong>{myInfo.name}</strong> <br />
                    {myInfo.email} <br />
                    {myInfo.phone} <br />
                    {myInfo.country}
                  </p>
                </div>

                <hr style={{ border: "1px solid #24364a", margin: "30px 0" }} />

                {/* Client Info */}
                <div style={{ textAlign: "center", marginBottom: "25px" }}>
                  <h5 style={{ color: "#24364a", marginBottom: "10px" }}>
                    Client Information
                  </h5>
                  <p>
                    <strong>{form.clientName}</strong> <br />
                    {form.clientEmail} <br />
                    {form.clientPhone} <br />
                    {form.clientCountry}
                  </p>
                </div>

                <hr style={{ border: "1px solid #24364a", margin: "30px 0" }} />

                {/* Project Info */}
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                  <h5 style={{ color: "#24364a", marginBottom: "10px" }}>
                    Project Details
                  </h5>
                  <p>
                    <strong>Type:</strong> {form.type} <br />
                    <strong>Project Name:</strong> {form.projectName} <br />
                    <strong>Duration:</strong> {form.duration} weeks <br />
                    <strong>Description:</strong> {form.description} <br />
                    <strong>Agreed Price:</strong> ₦
                    {selectedPrice?.toLocaleString()}
                  </p>
                </div>

                {/* Divider */}
                <div
                  style={{ borderTop: "2px solid #24364a", margin: "40px 0" }}
                ></div>

                {/* Signatures */}
                <div
                  className="d-flex justify-content-between"
                  style={{ marginTop: "50px" }}
                >
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontWeight: "bold" }}>Owner Signature</p>
                    <p style={{ fontWeight: "bold" }}>{myInfo.name}</p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontWeight: "bold" }}>Client Signature</p>
                    {form.clientName}
                  </div>
                </div>
              </div>
            )}

            {/* Terms Agreement (After Preview) */}
            {selectedPrice && (
              <div className="form-check mt-4">
                <input
                  className="form-check-input"
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
