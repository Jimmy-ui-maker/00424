"use client";
import Image from "next/image";

export default function TeamCard({ member }) {
  return (
    <div className=" mb-4 ">
      <div className="card   h-100 soft-shadow">
        <div className="ratio ratio-16x9 rounded-top overflow-hidden">
          <Image
            src={member.img}
            alt={member.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="card-body text-center">
          <h3 className="h5 mb-1">{member.name}</h3>
          <p className="text-secondary small mb-1">{member.role}</p>
          <p className="mb-2">{member.desc}</p>
          <ul className="list-unstyled small text-secondary mb-3">
            <li>📧 {member.email}</li>
            <li>📱 {member.contact}</li>
          </ul>
          <a
            href={member.facebook}
            target="_blank"
            className="btn btn-outline-primary soft-shadow btn-sm"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
