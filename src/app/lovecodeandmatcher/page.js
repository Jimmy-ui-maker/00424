"use client";

import { useEffect, useState } from "react";
import loveData from "@/data/loveCodes.json";

export default function LoveMatch() {
  const [activeTab, setActiveTab] = useState("codes");
  const [category, setCategory] = useState("Morning");
  const [messages, setMessages] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const [yourName, setYourName] = useState("");
  const [loverName, setLoverName] = useState("");
  const [matchPercent, setMatchPercent] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load messages on category change
  useEffect(() => {
    setMessages(loveData[category]);
  }, [category]);

  // Load saved love match
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("loveMatch"));
    if (saved) {
      setYourName(saved.yourName);
      setLoverName(saved.loverName);
      setMatchPercent(saved.matchPercent);
    }
  }, []);

  // Copy message
  const handleCopy = (msg, i) => {
    navigator.clipboard.writeText(msg);
    setCopiedIndex(i);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Clear matcher
  const handleClear = () => {
    setYourName("");
    setLoverName("");
    setProgress(0);
    setMatchPercent(null);
    setMessage("😂 All cleared! Ready for another love test?");
    localStorage.removeItem("loveMatch");
  };

  // Love Matcher logic
  const calculateMatch = () => {
    if (!yourName || !loverName) return alert("Please enter both names 💞");

    setLoading(true);
    setProgress(0);
    setMatchPercent(null);
    setMessage("");

    setTimeout(() => {
      let total = 0;
      const combo = yourName + loverName;
      for (let char of combo) total += char.charCodeAt(0);
      const loveValue = total % 101;

      localStorage.setItem(
        "loveMatch",
        JSON.stringify({ yourName, loverName, matchPercent: loveValue })
      );

      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setProgress(current);
        if (current >= loveValue) {
          clearInterval(interval);
          setLoading(false);
          setMatchPercent(loveValue);

          if (loveValue >= 90)
            setMessage("🎉 Congratulations, a perfect match made in heaven!");
          else if (loveValue >= 70)
            setMessage("💞 You two have great chemistry!");
          else if (loveValue >= 40)
            setMessage("💖 A spark is there, keep it glowing!");
          else setMessage("💔 Oops... maybe try again? 😂");
        }
      }, 50);
    }, 800); // delay before starting progress animation
  };

  const getEmoji = (val) => {
    if (val <= 40) return "💔";
    if (val <= 70) return "💖";
    if (val <= 90) return "💞";
    return "💘💖💞";
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-danger fw-bold mb-4">
        💕 Love Codes & Matcher 💕
      </h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4 justify-content-center">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "codes" ? "active" : ""}`}
            onClick={() => setActiveTab("codes")}
          >
            💌 Codes
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "matcher" ? "active" : ""}`}
            onClick={() => setActiveTab("matcher")}
          >
            ❤️ Matcher
          </button>
        </li>
      </ul>

      {/* Love Codes */}
      {activeTab === "codes" && (
        <div className="card p-3 shadow-sm love-card">
          <h5 className="text-center">💬 Choose a Category</h5>
          <select
            className="form-select mb-3"
            value={category}
            type="select"
            onChange={(e) => setCategory(e.target.value)}
          >
            {Object.keys(loveData).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <div className="love-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className="custom-alert d-flex justify-content-between align-items-center mb-2"
              >
                <span>{msg}</span>
                <button
                  className="btn btn-sm  copy-btn"
                  onClick={() => handleCopy(msg, i)}
                  title={copiedIndex === i ? "Copied!" : "Copy"}
                >
                  <i className="bi bi-copy"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Matcher */}
      {activeTab === "matcher" && (
        <div className="card p-4 shadow-lg love-card">
          <h5 className="text-center mb-3">❤️ Love Matcher</h5>

          <input
            type="text"
            className="form-control text-center mb-3"
            placeholder="Your Name"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
          />
          <input
            type="text"
            className="form-control text-center mb-3"
            placeholder="Lover's Name"
            value={loverName}
            onChange={(e) => setLoverName(e.target.value)}
          />

          <div className="d-flex gap-2">
            <button
              className="btn btn-danger flex-fill"
              onClick={calculateMatch}
            >
              {loading ? "💫 Love Matching..." : "💞 Match Love"}
            </button>
            <button
              className="btn btn-outline-dark flex-fill"
              onClick={handleClear}
            >
              🧹 Clear
            </button>
          </div>

          {/* Progress */}
          {progress > 0 && (
            <div className="progress my-3">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated bg-pink"
                role="progressbar"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
          )}

          {/* Result */}
          {matchPercent !== null && (
            <div className="text-center mt-3 love-result">
              <h4>
                Match Result:{" "}
                <span className="text-danger">
                  {matchPercent}% {getEmoji(matchPercent)}
                </span>
              </h4>
              <p className="fw-semibold mt-2">{message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
