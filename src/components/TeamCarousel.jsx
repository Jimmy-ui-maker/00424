"use client";

import { useState, useEffect } from "react";
import { teams } from "@/lib/data";
import TeamCard from "./TeamCard";

export default function TeamCarousel() {
  const [chunkSize, setChunkSize] = useState(3);

  useEffect(() => {
    const updateChunkSize = () => {
      if (window.innerWidth < 768) {
        setChunkSize(1); // Small screens
      } else {
        setChunkSize(3); // Medium+ screens
      }
    };

    updateChunkSize(); // initial run
    window.addEventListener("resize", updateChunkSize);
    return () => window.removeEventListener("resize", updateChunkSize);
  }, []);

  // chunk the array
  const chunked = [];
  for (let i = 0; i < teams.length; i += chunkSize) {
    chunked.push(teams.slice(i, i + chunkSize));
  }

  return (
    <div
      id="teamCarousel"
      className="carousel team-card slide"
      data-bs-ride="carousel"
    >
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
