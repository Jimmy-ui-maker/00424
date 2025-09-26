"use client";
import { useState } from "react";
import Link from "next/link";

export default function SearchModal() {
  const [query, setQuery] = useState("");

  // Pages list
  const pages = [
    { name: "Games", url: "/games" },
    { name: "Ex-Gfrnds", url: "/exgfrnds" },
    { name: "About", url: "/about" },
    { name: "Services", url: "/services" },
    { name: "Projects", url: "/projects" },
    { name: "Teams", url: "/teams" },
    { name: "FAQs", url: "/faqs" },
    { name: "Contact", url: "/contact" },
  ];

  const filteredPages = pages.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleClose = () => {
    // Close modal manually when navigating
    const modalEl = document.getElementById("searchModal");
    const modal = window.bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
    setQuery(""); // reset search
  };

  return (
    <div
      className="modal fade"
      id="searchModal"
      tabIndex="-1"
      aria-labelledby="searchModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title" id="searchModalLabel">
              Search
            </h5>
            <button
              type="button"
              className="btn-close shadow-none"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setQuery("")}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <input
              type="text"
              className=" mb-3"
              placeholder="Type to search..."
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {/* Show results only when query is typed */}
            {query.trim() !== "" && (
              <ul className="list-group">
                {filteredPages.length > 0 ? (
                  filteredPages.map((page) => (
                    <li key={page.url} className="list-group-item  my-2">
                      <Link
                        href={page.url}
                        className="text-decoration-none "
                        onClick={handleClose}
                      >
                        {page.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-muted">
                    No results found
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
