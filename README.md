# 🎥 Asciinema Webplayer

A simple React web app that lets you **upload and play `.cast` terminal recordings** directly in your browser using the [asciinema-player](https://www.npmjs.com/package/asciinema-player) library.


---

## ✨ Features

- Upload a `.cast` file from your computer (drag & drop or file picker).
- Play the recording client-side — your file never leaves the browser.
- Playback controls:
  - Autoplay
  - Loop
  - Playback speed
  - Themes (`asciinema`, `tango`, `monokai`, `solarized-dark`, `solarized-light`)
  - Fit modes (`both`, `width`, `height`, `none`)
- Adjustable player height to fit screen.
- Inline CSS styles (no external frameworks required).

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the dev server
```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 🛠 Tech Stack

- [React](https://react.dev/) — UI framework
- [asciinema-player](https://www.npmjs.com/package/asciinema-player) — terminal recording player

---

## 📂 Project Structure

```
.
├── src/
│   ├── App.jsx          # Main React component
│ 
├── index.html           # HTML shell
├── package.json
└── README.md
```

---

## 🖼 Usage

1. Drag and drop a `.cast` file (or select one using the file input).
2. The recording will load instantly into the embedded Asciinema player.
3. Use the playback options panel to tweak speed, theme, fit, and looping.

---

## 📸 Demo `.cast` Files

You can create `.cast` recordings with [asciinema](https://asciinema.org/):

```bash
asciinema rec demo.cast
```

Then upload `demo.cast` into this app to play it back.

---

## 🤝 Contributing

Pull requests are welcome! If you’d like to add features (e.g., saving playback settings, sharing recordings), open an issue first to discuss.

---

## 📜 License

[MIT](LICENSE)
