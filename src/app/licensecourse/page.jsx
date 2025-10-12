"use client";

import { useState, useEffect } from "react";
import coursesData from "@/data/licenseCourses.json";

export default function LicenseCoursePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // licensed / unlicensed / all
  const [campusFilter, setCampusFilter] = useState("all"); // university / polytechnic / fce / all
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const coursesPerPage = 6;

  useEffect(() => {
    let results = coursesData.filter((course) =>
      course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter === "licensed") {
      results = results.filter((c) => c.isLicensed);
    } else if (filter === "unlicensed") {
      results = results.filter((c) => !c.isLicensed);
    }

    if (campusFilter !== "all") {
      results = results.filter((c) =>
        c.campuses.map((x) => x.toLowerCase()).includes(campusFilter)
      );
    }

    setFilteredCourses(results);
    setCurrentPage(1); // reset pagination when filter/search changes
  }, [searchTerm, filter, campusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-3 fw-bold text-primary">
        License Course Nigeria
      </h2>
      <p className="text-center  mb-4">
        Check if your desired course of study is licensed and by which
        professional body in Nigeria.
      </p>

      {/* Search and Filters */}
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a course e.g. Computer Science"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Courses</option>
            <option value="licensed">Licensed Only</option>
            <option value="unlicensed">Unlicensed Only</option>
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={campusFilter}
            onChange={(e) => setCampusFilter(e.target.value)}
          >
            <option value="all">All Campuses</option>
            <option value="university">University</option>
            <option value="polytechnic">Polytechnic</option>
            <option value="fce">FCE</option>
          </select>
        </div>
      </div>

      {/* Course Cards */}
      <div className="row">
        {currentCourses.length > 0 ? (
          currentCourses.map((course, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div
                className={`card shadow-sm h-100 border-2 ${
                  course.isLicensed ? "border-success" : "border-danger"
                }`}
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold  text-primary">
                    {course.courseTitle}
                  </h5>
                  <p className="mb-1">
                    <strong>Campuses:</strong> {course.campuses.join(", ")}
                  </p>

                  <p
                    className={`fw-semibold ${
                      course.isLicensed ? "text-success" : "text-danger"
                    }`}
                  >
                    {course.isLicensed ? "✅ Licensed" : "❌ Not Licensed"}
                  </p>

                  {course.isLicensed && (
                    <>
                      <p className="mb-1">
                        <strong>Licensing Body:</strong> {course.licensingBody}
                      </p>
                      {course.website && (
                        <a
                          href={course.website}
                          className="btn btn-outline-primary btn-sm mt-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Website
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center  mt-5">
            No courses found for your search or filter.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
