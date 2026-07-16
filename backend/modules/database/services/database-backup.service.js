// modules/database/services/database-backup.service.js

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const PG_DUMP_PATH = process.platform === "win32"
  ? "C:/Program Files/PostgreSQL/17/bin/pg_dump.exe"
  : "pg_dump";

const BACKUP_DIR = path.join(process.cwd(), "storage", "backups");

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

class DatabaseBackupService {
  async createBackup() {
    return new Promise((resolve, reject) => {
      try {
        const databaseUrl = process.env.DIRECT_URL;

        if (!databaseUrl) {
          return reject(new Error("DIRECT_URL no configurado en las variables de entorno."));
        }

        let connectionUri = databaseUrl;
        let envVariables = { ...process.env };

        try {
          const parsedUrl = new URL(databaseUrl);
          if (parsedUrl.password) {
            envVariables.PGPASSWORD = decodeURIComponent(parsedUrl.password);
            parsedUrl.password = "";
            connectionUri = parsedUrl.toString();
          }
        } catch (parseError) {
          console.warn("No se pudo parsear DIRECT_URL como un objeto URL. Usando cadena original.");
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const filename = `backup-${timestamp}.sql`;
        const filepath = path.join(BACKUP_DIR, filename);

        const args = [
          "--dbname", connectionUri,
          "--no-owner",
          "--no-privileges",
          "--format=plain",
          "--verbose",
          `--file=${filepath}`,
        ];

        console.log(`Iniciando respaldo de base de datos... Archivo de salida: ${filename}`);

        const dumpProcess = spawn(PG_DUMP_PATH, args, {
          shell: false,
          env: envVariables,
        });

        let stdout = "";
        let stderr = "";

        dumpProcess.stdout.on("data", (data) => {
          stdout += data.toString();
        });

        dumpProcess.stderr.on("data", (data) => {
          stderr += data.toString();
        });

        dumpProcess.on("error", (error) => {
          console.error("Error al iniciar el proceso de pg_dump:", error);
          reject({
            success: false,
            message: error.message,
            error: "BACKUP_PROCESS_INIT_FAILED",
            timestamp: new Date(),
          });
        });

        dumpProcess.on("close", (code) => {
          if (code !== 0) {
            console.error(`pg_dump falló con código de salida ${code}. Stderr:`, stderr);
            return reject({
              success: false,
              message: stderr.trim() || `pg_dump terminó con código ${code}`,
              error: "BACKUP_EXECUTION_FAILED",
              timestamp: new Date(),
            });
          }

          if (!fs.existsSync(filepath)) {
            return reject({
              success: false,
              message: "El proceso terminó exitosamente, pero el archivo de respaldo no fue creado.",
              error: "BACKUP_FILE_NOT_FOUND",
              timestamp: new Date(),
            });
          }

          const stats = fs.statSync(filepath);

          if (stats.size === 0) {
            fs.unlinkSync(filepath);
            return reject({
              success: false,
              message: "El archivo de respaldo fue creado pero está completamente vacío.",
              error: "BACKUP_FILE_EMPTY",
              timestamp: new Date(),
            });
          }

          resolve({
            success: true,
            message: "Backup creado correctamente.",
            backup: {
              filename,
              filepath,
              size: stats.size,
              createdAt: new Date(),
            },
            timestamp: new Date(),
          });
        });

      } catch (error) {
        reject({
          success: false,
          message: error.message,
          error: "BACKUP_UNEXPECTED_ERROR",
          timestamp: new Date(),
        });
      }
    });
  }

  async getBackups() {
    try {
      const files = fs.readdirSync(BACKUP_DIR);

      const backups = files
        .filter((file) => file.endsWith(".sql"))
        .map((file) => {
          const filePath = path.join(BACKUP_DIR, file);
          const stats = fs.statSync(filePath);

          return {
            name: file,
            path: filePath,
            size: stats.size,
            createdAt: stats.birthtime,
            updatedAt: stats.mtime,
          };
        });

      backups.sort((a, b) => b.createdAt - a.createdAt);

      return {
        success: true,
        total: backups.length,
        backups,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("Error leyendo directorio de respaldos:", error);
      throw error;
    }
  }
}

module.exports = new DatabaseBackupService();
