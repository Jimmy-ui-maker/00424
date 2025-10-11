"use client";
import Link from "next/link";

export default function HymnsPage() {
  const hymns = [
    {
      name: "English Hymn",
      slug: "hymn",
      desc: "A collection of timeless English hymns that inspire worship and reflection in the church.",
    },
    {
      name: "Littafin Wakoki",
      slug: "littafin-wakoki",
      desc: "Littafin Wakoki na Hausa wanda ake rerawa a majami'u domin yabo da girmama Allah.",
    },
    {
      name: "Orin Ìyìn",
      slug: "orin-iyin",
      desc: "Àkójọpọ̀ orin ìjọ ní èdè Yorùbá tó ń dá ọkàn balẹ̀, tó sì ń jẹ́ ká sun mọ́ Ọlọ́run.",
    },
    {
      name: "Abụ Ndị Kraịst",
      slug: "abu-ndi-kraist",
      desc: "Ngụkọ abụ ndị ụka n’asụsụ Igbo nke na-eme ka mmadụ jiri obi ekele too Chineke.",
    },
  ];

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">🗺️ Hymn Dashboard</h1>
      <div className="row">
        {hymns.map((hymn) => (
          <div className="col-md-4 mb-4" key={hymn.slug}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{hymn.name}</h5>
                <p className="card-text flex-grow-1">{hymn.desc}</p>
                <Link
                  href={`/hymns/${hymn.slug}`}
                  className="btn  mt-auto"
                >
                  📖 {hymn.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
