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

          <div className="">
            <a
              href={`https://wa.me/${member.contact}`}
              target="_blank"
              className="btn mx-1   soft-shadow btn-sm"
            >
              <i className=" bi bi-whatsapp  px-2 fs-2 text-success"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
