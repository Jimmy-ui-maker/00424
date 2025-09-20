import React from "react";

export default function ExCard({ image, name, myReason, herReason }) {
  return (
    <div className="ex-card soft-card mt-4 mb-5 p-3">
      {/* Profile Image */}
      <div className="d-flex justify-content-center">
        <img src={image} alt={name} className="profile-img" />
      </div>

      {/* Name */}
      <h2 className="mt-4">{name}</h2>
      <p>Ex Girlfriend</p>

      {/* Reasons */}
      <div className="row mt-3">
        {/* Left - My Reason */}
        <div className="col-md-6 reason-box border-end">
          <div className="reason-title text-danger fw-semibold">Why I Left</div>
          <p>{myReason}</p>
        </div>

        {/* Right - Her Reason */}
        <div className="col-md-6 reason-box">
          <div className="reason-title text-primary fw-semibold">
            Why She Left
          </div>
          <p>{herReason}</p>
        </div>
      </div>
    </div>
  );
}
