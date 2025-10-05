"use client";

import { useState, useEffect } from "react";
import colorsData from "@/data/colors.json";

export default function ColorCharts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedColor, setCopiedColor] = useState("");
  const [filteredColors, setFilteredColors] = useState(colorsData || []);
  const [totalColors, setTotalColors] = useState(0);
  const [totalGroups, setTotalGroups] = useState(0);

  useEffect(() => {
    const filtered = colorsData.filter(
      (group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.colors.some(
          (color) =>
            color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            color.hex.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    setFilteredColors(filtered);

    // Count totals
    const colorCount = filtered.reduce(
      (sum, group) => sum + group.colors.length,
      0
    );
    setTotalColors(colorCount);
    setTotalGroups(filtered.length);
  }, [searchTerm]);

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const hexToHsl = (hex) => {
    let { r, g, b } = hexToRgb(hex);
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) h = s = 0;
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hexToCmyk = (hex) => {
    let { r, g, b } = hexToRgb(hex);
    (r /= 255), (g /= 255), (b /= 255);

    let k = 1 - Math.max(r, g, b);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };

    let c = ((1 - r - k) / (1 - k)) * 100;
    let m = ((1 - g - k) / (1 - k)) * 100;
    let y = ((1 - b - k) / (1 - k)) * 100;
    return {
      c: Math.round(c),
      m: Math.round(m),
      y: Math.round(y),
      k: Math.round(k * 100),
    };
  };

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(""), 1200);
  };

  return (
    <div className="container">
      <div className="min-vh-100  ">
        <div className="text-center mb-4">
          <h1 className="fw-bold display-6 mb-3">
            🎨 My <span className="">Color Charts</span>
          </h1>

          <div className="mx-auto" style={{ maxWidth: "400px" }}>
            <input
              type="search"
              className="form-control text-center"
              placeholder="🔍 Search color name or code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Totals */}
            <div className="mt-3 fw-semibold ">
              <p className="mb-1">
                Total Colors: <span className="">{totalColors}</span>
              </p>
              <p className="mb-0">
                Total Color Groups: <span className="">{totalGroups}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {filteredColors.length > 0 ? (
            filteredColors.map((group, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4">
                <div className="card soft-card color-card text-center p-4 h-100">
                  <h5 className="fw-semibold mb-3">{group.name}</h5>

                  <div className="d-flex justify-content-center gap-4 flex-wrap">
                    {group.colors.map((color, i) => {
                      const { r, g, b } = hexToRgb(color.hex);
                      const hsl = hexToHsl(color.hex);
                      const cmyk = hexToCmyk(color.hex);
                      const rgba = `rgba(${r}, ${g}, ${b}, 1)`;

                      return (
                        <div
                          key={i}
                          className="position-relative group"
                          onClick={() => handleCopy(color.hex)}
                        >
                          <div
                            className="color-circle border border-1"
                            style={{ backgroundColor: color.hex }}
                          ></div>

                          {/* Tooltip */}
                          <div className="color-tooltip">
                            <p className="fw-bold mb-1">{color.name}</p>
                            <p className="mb-0">HEX: {color.hex}</p>
                            <p className="mb-0">
                              RGB: ({r}, {g}, {b})
                            </p>
                            <p className="mb-0">RGBA: {rgba}</p>
                            <p className="mb-0">
                              HSL: ({hsl.h}, {hsl.s}%, {hsl.l}%)
                            </p>
                            <p className="mb-0">
                              CMYK: ({cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%)
                            </p>
                          </div>

                          {/* Copied message */}
                          {copiedColor === color.hex && (
                            <div className="copy-toast">Copied!</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-5">
              <p className="text-danger fw-bold">
                <i className="bi bi-exclamation-triangle"></i> No color match
                found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
