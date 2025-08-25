"use client";

import { teams } from "@/lib/data";
import TeamCard from "./TeamCard";

export default function TeamCarousel() {
  // chunk into groups of 3 for each slide
  const chunked = [];
  for (let i = 0; i < teams.length; i += 3) {
    chunked.push(teams.slice(i, i + 3));
  }

  return (
    <div id="teamCarousel" className="carousel team-card slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {chunked.map((group, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div className="row g-3 justify-content-center">
              {group.map((member) => (
                <div className="col-12 col-md-6 col-lg-4" key={member.name}>
                  <TeamCard member={member} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="d-flex justify-content-center mt-5 pb-2 gap-2">
        <button
          className="btn btn-outline-primary soft-shadow"
          type="button"
          data-bs-target="#teamCarousel"
          data-bs-slide="prev"
        >
          ‹ Prev
        </button>
        <button
          className="btn btn-outline-primary soft-shadow"
          type="button"
          data-bs-target="#teamCarousel"
          data-bs-slide="next"
        >
          Next ›
        </button>
      </div>
    </div>
  );
}
