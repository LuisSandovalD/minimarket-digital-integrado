export default function GeminiMigrateTab({
  rawJsonInput,
  setRawJsonInput,
  customPrompt,
  setCustomPrompt,
  migrationResult,
  isMigrationLoading,
  migrationError,
  onProcessMigration,
}) {
  return (
    <div className="h-full overflow-y-auto bg-white border border-gray-200 rounded-b-lg p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Mapeador de Inventario Histórico
        </h2>
        <p className="text-sm text-gray-500">
          Pega el array JSON extraído de tus hojas de cálculo antiguas para
          deducir entidades compatibles con Prisma.
        </p>
      </div>

      <form onSubmit={onProcessMigration} className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-bold text-gray-600 uppercase">
            Datos en bruto (JSON de Excel)
          </label>
          <textarea
            rows={6}
            value={rawJsonInput}
            onChange={(e) => setRawJsonInput(e.target.value)}
            disabled={isMigrationLoading}
            placeholder='[\n  { "PRODUCTO": "Leche 1L", "PRECIO_VTA": 4.50 }\n]'
            className="font-mono text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-bold text-gray-600 uppercase">
            Instrucciones Adicionales (Opcional)
          </label>
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            disabled={isMigrationLoading}
            placeholder="Ej: Si no encuentras el SKU, genéralo automáticamente..."
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
          />
        </div>

        {migrationError && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-medium">
            {migrationError}
          </div>
        )}

        <button
          type="submit"
          disabled={isMigrationLoading || !rawJsonInput.trim()}
          className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-300"
        >
          {isMigrationLoading
            ? "Estructurando blueprint..."
            : "Comenzar Análisis Predictivo"}
        </button>
      </form>

      {migrationResult && (
        <div className="mt-6 border border-emerald-200 bg-emerald-50/20 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-emerald-800">
              ✅ Plano de Carga Transaccional Estructurado Exitosamente
            </h4>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
              Listo para Prisma
            </span>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto max-h-60 border border-gray-800">
            <pre className="text-emerald-400 font-mono text-xs leading-relaxed">
              {JSON.stringify(migrationResult, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
