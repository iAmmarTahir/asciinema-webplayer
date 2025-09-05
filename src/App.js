import React, { useEffect, useRef, useState } from "react";
import "asciinema-player/dist/bundle/asciinema-player.css";
import * as AsciinemaPlayer from "asciinema-player";

export default function App() {
  const mountRef = useRef(null);
  const playerRef = useRef(null);

  const [fileUrl, setFileUrl] = useState(null);
  const [status, setStatus] = useState("");
  const [options, setOptions] = useState({
    autoplay: true,
    preload: true,
    loop: false,
    speed: 3,
    theme: "asciinema",
    fit: "width",
    poster: "npt:0:00",
    controls: true,
  });

  useEffect(() => {
    if (!fileUrl || !mountRef.current) return;

    if (playerRef.current) {
      try {
        playerRef.current.dispose?.();
      } catch {}
      playerRef.current = null;
    }
    mountRef.current.innerHTML = "";

    try {
      playerRef.current = AsciinemaPlayer.create(
        fileUrl,
        mountRef.current,
        options
      );
      setStatus("");
    } catch (e) {
      console.error(e);
      setStatus("Failed to load cast. Is it a valid .cast file?");
    }

    return () => {
      try {
        playerRef.current?.dispose?.();
      } catch {}
      if (fileUrl) URL.revokeObjectURL(fileUrl);
      playerRef.current = null;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (mountRef.current) mountRef.current.innerHTML = "";
    };
  }, [fileUrl, options]);

  function onFile(file) {
    if (!file) return;
    if (!file.name.endsWith(".cast")) {
      setStatus("Please choose a .cast file (JSON recording).");
      return;
    }
    setFileUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        color: "#111827",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "64rem",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Asciinema Player
          </h1>
        </header>

        <div
          onDrop={(e) => {
            e.preventDefault();
            onFile(e.dataTransfer.files?.[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          style={{
            border: "2px dashed #d1d5db",
            borderRadius: "16px",
            padding: "24px",
            backgroundColor: "white",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          <p style={{ marginBottom: "12px" }}>
            Drag & drop a <code>.cast</code> file here, or choose one:
          </p>
          <input
            type="file"
            accept=".cast,application/json"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          {status && (
            <div
              style={{
                marginTop: "12px",
                fontSize: "0.875rem",
                color: "#4b5563",
              }}
            >
              {status}
            </div>
          )}

          <details style={{ marginTop: "16px" }}>
            <summary
              style={{
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500",
                userSelect: "none",
              }}
            >
              Playback options
            </summary>
            <div
              style={{
                marginTop: "12px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                fontSize: "0.875rem",
              }}
            >
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>Autoplay</span>
                <input
                  type="checkbox"
                  checked={options.autoplay}
                  onChange={(e) =>
                    setOptions({ ...options, autoplay: e.target.checked })
                  }
                />
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>Loop</span>
                <input
                  type="checkbox"
                  checked={options.loop}
                  onChange={(e) =>
                    setOptions({ ...options, loop: e.target.checked })
                  }
                />
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>Speed</span>
                <input
                  type="number"
                  min={0.25}
                  step={0.25}
                  value={options.speed}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      speed: Number(e.target.value || 1),
                    })
                  }
                  style={{
                    width: "6rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    padding: "4px 8px",
                  }}
                />
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>Theme</span>
                <select
                  value={options.theme}
                  onChange={(e) =>
                    setOptions({ ...options, theme: e.target.value })
                  }
                  style={{
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    padding: "4px 8px",
                  }}
                >
                  <option value="asciinema">asciinema</option>
                  <option value="tango">tango</option>
                  <option value="monokai">monokai</option>
                  <option value="solarized-dark">solarized-dark</option>
                  <option value="solarized-light">solarized-light</option>
                </select>
              </label>
              <label
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span>Fit</span>
                <select
                  value={options.fit}
                  onChange={(e) =>
                    setOptions({ ...options, fit: e.target.value })
                  }
                  style={{
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    padding: "4px 8px",
                  }}
                >
                  <option value="both">both</option>
                  <option value="width">width</option>
                  <option value="height">height</option>
                  <option value="none">none</option>
                </select>
              </label>
            </div>
          </details>
        </div>

        <div
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "black",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div ref={mountRef} />
        </div>

        <footer style={{ fontSize: "0.75rem", color: "#6b7280" }}>
          Built by{" "}
          <a
            href="https://github.com/iAmmarTahir"
            target="_blank"
            rel="noreferrer"
          >
            Ammar Tahir
          </a>
        </footer>
      </div>
    </div>
  );
}
