"use client";
import { useState, useEffect, useRef } from "react";
import hausahymn from "@/data/hausahymn.json";

export default function LittafinWakokiPage() {
  const [hymns, setHymns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHymn, setSelectedHymn] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setHymns(hausahymn);
  }, []);

  const filteredHymns = hymns.filter(
    (hymn) =>
      hymn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hymn.number.toString().includes(searchTerm)
  );

  const handleSelectHymn = (hymn) => {
    if (selectedHymn?.number === hymn.number) {
      setSelectedHymn(null);
      handleStopAudio();
    } else {
      setSelectedHymn(hymn);
      handleStopAudio();
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">📖 Littafin Wakoki (Hausa Hymns)</h1>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search by number or title..."
          className="form-control shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Hymn list */}
      {filteredHymns.map((hymn) => (
        <div
          key={hymn.number}
          className="card mb-3 shadow-sm border-0 rounded-3"
        >
          <div
            className="card-body d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectHymn(hymn)}
          >
            <span className="fw-bold ">
              {hymn.number}. {hymn.title}
            </span>
            <span className="small">
              {selectedHymn?.number === hymn.number ? "▲ Hide" : "▼ View"}
            </span>
          </div>

          {/* Display lyrics when selected */}
          {selectedHymn?.number === hymn.number && (
            <div className="p-4 text-center border-top">
              <h4 className="fw-bold mb-4">
                {hymn.number}. {hymn.title}
              </h4>

              {/* Audio section */}
              {hymn.audio && hymn.audio !== "" ? (
                <div className="mb-3">
                  <button
                    onClick={handlePlayPause}
                    className={`btn ${
                      isPlaying ? "btn-danger" : "btn-success"
                    } mb-3`}
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </button>
                  <audio
                    ref={audioRef}
                    src={hymn.audio}
                    onEnded={() => setIsPlaying(false)}
                  />
                </div>
              ) : (
                <p className=" fst-italic small mb-3">
                  🎵 Audio will be added soon.
                </p>
              )}

              {/* Verses and Chorus */}
              {hymn.verses.map((verse, idx) => (
                <div key={idx} className="mb-3">
                  <h6 className="fw-bold mb-2">Verse {idx + 1}</h6>
                  {verse.split("\n").map((line, i) => (
                    <p key={i} className="mb-1">
                      {line}
                    </p>
                  ))}

                  {/* Chorus appears after first verse only */}
                  {idx === 0 && hymn.chorus && (
                    <div className="py-2 mt-3 ">
                      <strong>Chorus:</strong>
                      <br />
                      {hymn.chorus.split("\n").map((line, i) => (
                        <p key={i} className="mb-1">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
