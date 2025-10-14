/*
5th Gen Charts - Single-file React component (App.jsx)
*/

import React, { useMemo, useState } from "react";

const groupColors = {
  IZNA: "#e53935", // vermelho
  CORTIS: "#6b7280", // cinza suave (melhor contraste)
  Zerobaseone: "#1e40af", // azul escuro
  Babymonster: "#a3e635", // verde limão
  ILLIT: "#f9a8d4", // rosa claro
  Boynextdoor: "#8b5cf6", // roxo violeta
  KATSEYE: "#facc15", // dourado
  meovv: "#c084fc", // lavanda
  hearts2hearts: "#fb7185", // coral
  kickflip: "#06b6d4", // ciano
  RIIZE: "#fb923c", // laranja
};

const GROUPS = Object.keys(groupColors);

const PLATFORMS = ["All Platforms", "Spotify", "YouTube", "Apple Music", "Melon"];
const TABS = ["Daily Chart", "Real-Time Chart", "History & Comparison", "My Fans Space"];

const LABELS = {
  en: {
    title: "5th Gen Charts",
    tabs: TABS,
    filters: "Filters",
    groups: "Groups",
    platforms: "Platforms",
    dailyTop: "Daily Top Charts",
    updated: "Updated",
    streams: "Streams",
    artist: "Artist",
    language: "EN/PT",
  },
  pt: {
    title: "5th Gen Charts",
    tabs: TABS.map((t) => {
      switch (t) {
        case "Daily Chart": return "Ranking Diário";
        case "Real-Time Chart": return "Ranking em Tempo Real";
        case "History & Comparison": return "Histórico & Comparação";
        case "My Fans Space": return "Meu Espaço Fã";
        default: return t;
      }
    }),
    filters: "Filtros",
    groups: "Grupos",
    platforms: "Plataformas",
    dailyTop: "Top Diário",
    updated: "Atualizado",
    streams: "Streams",
    artist: "Artista",
    language: "EN/PT",
  },
};

const sampleData = [
  { rank: 1, title: "Neon Sunrise", artist: "IZNA", streams: "2.4M", change: "+2", group: "IZNA" },
  { rank: 2, title: "Midnight Pulse", artist: "Jae C", streams: "1.9M", change: "+5", group: "Boynextdoor" },
  { rank: 3, title: "Gravity", artist: "Zerobaseone", streams: "1.7M", change: "-1", group: "Zerobaseone" },
  { rank: 4, title: "Heartbeat", artist: "Babymonster", streams: "1.5M", change: "+1", group: "Babymonster" },
  { rank: 5, title: "Flashback", artist: "CORTIS", streams: "1.2M", change: "-2", group: "CORTIS" },
];

export default function App() {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);
  const [selectedGroup, setSelectedGroup] = useState("All Groups");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [lang, setLang] = useState("en");

  const themeColor = useMemo(() => {
    if (selectedGroup === "All Groups") return "#8b5cf6";
    const key = GROUPS.find((g) => g.toLowerCase() === selectedGroup.toLowerCase());
    return (key && groupColors[key]) || "#8b5cf6";
  }, [selectedGroup]);

  const filtered = sampleData.filter((s) => {
    if (selectedGroup !== "All Groups" && s.group.toLowerCase() !== selectedGroup.toLowerCase()) return false;
    return true;
  });

  const L = LABELS[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-4 sm:p-6" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: themeColor }}>
            <span className="font-bold text-black">5G</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{L.title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-gray-800 px-3 py-1">
            <button
              onClick={() => setLang((l) => (l === "en" ? "pt" : "en"))}
              className="text-sm font-medium"
              aria-label="toggle language"
            >
              {L.language}
            </button>
          </div>

          <div className="flex items-center gap-2 text-xl opacity-90">
            <button className="p-2 rounded-full bg-gray-800">▶</button>
            <button className="p-2 rounded-full bg-gray-800">🔔</button>
            <button className="p-2 rounded-full bg-gray-800">👤</button>
          </div>
        </div>
      </header>

      <nav className="flex gap-4 sm:gap-6 overflow-x-auto pb-3 mb-6 scrollbar-hide">
        {L.tabs.map((tab, i) => (
          <button
            key={TABS[i]}
            onClick={() => setSelectedTab(TABS[i])}
            className={`pb-2 whitespace-nowrap ${selectedTab === TABS[i] ? "text-white font-semibold border-b-2" : "text-gray-400"}`}
            style={selectedTab === TABS[i] ? { borderColor: themeColor } : {}}
          >
            {tab}
          </button>
        ))}
      </nav>

      <section className="mb-6">
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <span className="text-sm text-gray-400">{L.groups}:</span>
          <button
            onClick={() => setSelectedGroup("All Groups")}
            className={`px-3 py-1 rounded-full text-sm ${selectedGroup === "All Groups" ? "text-white" : "text-gray-300 bg-gray-800"}`}
            style={selectedGroup === "All Groups" ? { background: themeColor } : {}}
          >
            All Groups
          </button>
          {GROUPS.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`px-3 py-1 rounded-full text-sm ${selectedGroup === g ? "text-white" : "text-gray-300 bg-gray-800"}`}
              style={selectedGroup === g ? { background: groupColors[g] } : {}}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-400">{L.platforms}:</span>
          {PLATFORMS.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPlatform(p)}
              className={`px-3 py-1 rounded-full text-sm ${selectedPlatform === p ? "text-white" : "text-gray-300 bg-gray-800"}`}
              style={selectedPlatform === p ? { background: themeColor } : {}}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      <main>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{L.dailyTop}</h2>
          <div className="text-sm text-gray-400">{L.updated}: 11:36:00</div>
        </div>

        <div className="space-y-4">
          {filtered.map((song) => (
            <ChartCard key={song.rank} song={song} themeColor={themeColor} />
          ))}
        </div>
      </main>

      <footer className="mt-8 text-xs text-gray-500">
        • This is a demo UI. Connect your chart API and replace `sampleData` to make it dynamic.
      </footer>
    </div>
  );
}

function ChartCard({ song, themeColor }) {
  const up = song.change && song.change.startsWith("+");
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-gray-700 text-xl font-semibold">{song.rank}</div>
        <div>
          <div className="text-lg font-semibold">{song.title}</div>
          <div className="text-sm text-gray-400">{song.artist}</div>
        </div>
      </div>

      <div className="text-right">
        <div className="font-bold" style={{ color: themeColor }}>{song.streams}</div>
        <div className={`text-sm ${up ? "text-green-400" : "text-red-400"}`}>{song.change}</div>
      </div>
    </div>
  );
            }
