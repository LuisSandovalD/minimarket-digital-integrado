export default function GeminiTabsHeader({ activeTab, setActiveTab }) {
  return (
    <div className="flex border-b border-gray-200 mb-4 bg-white rounded-t-lg shadow-sm">
      <button
        onClick={() => setActiveTab("chat")}
        className={`flex-1 py-3 text-center font-medium transition-all ${
          activeTab === "chat"
            ? "border-b-2 border-indigo-600 text-indigo-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        💬 Panel Estratégico de Mateo (CFO)
      </button>
      <button
        onClick={() => setActiveTab("migrate")}
        className={`flex-1 py-3 text-center font-medium transition-all ${
          activeTab === "migrate"
            ? "border-b-2 border-indigo-600 text-indigo-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        📊 Conversión Predictiva Excel
      </button>
    </div>
  );
}
