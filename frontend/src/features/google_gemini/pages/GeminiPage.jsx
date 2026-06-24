import GeminiChatTab from "../components/GeminiChatTab";
import GeminiMigrateTab from "../components/GeminiMigrateTab";
import GeminiTabsHeader from "../components/GeminiTabsHeader";
import { useGeminiManager } from "../hooks/useGeminiManager";

export default function GeminiPage() {
  const {
    activeTab,
    setActiveTab,
    messages,
    inputMessage,
    setInputMessage,
    isChatLoading,
    chatEndRef,
    rawJsonInput,
    setRawJsonInput,
    customPrompt,
    setCustomPrompt,
    migrationResult,
    isMigrationLoading,
    migrationError,
    handleSendMessage,
    handleProcessMigration,
    handleResetChat,
  } = useGeminiManager();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-6xl mx-auto p-4 font-sans bg-gray-50 text-gray-800">
      {/* Selector de Navegación */}
      <GeminiTabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Contenedor de Vistas Dinámicas */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "chat" && (
          <GeminiChatTab
            messages={messages}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            isChatLoading={isChatLoading}
            chatEndRef={chatEndRef}
            onSendMessage={handleSendMessage}
            onResetChat={handleResetChat}
          />
        )}

        {activeTab === "migrate" && (
          <GeminiMigrateTab
            rawJsonInput={rawJsonInput}
            setRawJsonInput={setRawJsonInput}
            customPrompt={customPrompt}
            setCustomPrompt={setCustomPrompt}
            migrationResult={migrationResult}
            isMigrationLoading={isMigrationLoading}
            migrationError={migrationError}
            onProcessMigration={handleProcessMigration}
          />
        )}
      </div>
    </div>
  );
}
