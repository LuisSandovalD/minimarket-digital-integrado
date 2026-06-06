// modules/database/repositories/backup.repository.js

const fs =
    require("fs");

const path =
    require("path");

class BackupRepository {

    /*
    |--------------------------------------------------------------------------
    | Backup Directory
    |--------------------------------------------------------------------------
    */

    BACKUP_DIR =
        path.join(

            process.cwd(),

            "storage",

            "backups",
        );

    /*
    |--------------------------------------------------------------------------
    | Ensure Backup Directory
    |--------------------------------------------------------------------------
    */

    ensureDirectory() {

        if (
            !fs.existsSync(
                this.BACKUP_DIR
            )
        ) {

            fs.mkdirSync(

                this.BACKUP_DIR,

                {
                    recursive: true,
                }
            );
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Create Backup File
    |--------------------------------------------------------------------------
    */

    async createBackup(data = {}) {

        this.ensureDirectory();

        const timestamp =
            new Date()

                .toISOString()

                .replace(
                    /[:.]/g,
                    "-"
                );

        const filename =
            `backup-${timestamp}.json`;

        const filepath =
            path.join(

                this.BACKUP_DIR,

                filename
            );

        const backupContent = {

            createdAt:
                new Date(),

            data,
        };

        fs.writeFileSync(

            filepath,

            JSON.stringify(
                backupContent,
                null,
                2
            )
        );

        const stats =
            fs.statSync(
                filepath
            );

        return {

            success: true,

            action:
                "backup_created",

            filename,

            filepath,

            size:
                stats.size,

            sizeMB:
                (
                    stats.size /
                    1024 /
                    1024
                ).toFixed(2),

            createdAt:
                new Date(),
        };
    }

    /*
    |--------------------------------------------------------------------------
    | Restore Backup File
    |--------------------------------------------------------------------------
    */

    async restoreBackup(data = {}) {

        this.ensureDirectory();

        const {
            filename,
        } = data;

        if (!filename) {

            throw new Error(
                "El nombre del archivo es requerido"
            );
        }

        const filepath =
            path.join(

                this.BACKUP_DIR,

                filename
            );

        if (
            !fs.existsSync(
                filepath
            )
        ) {

            throw new Error(
                "El archivo backup no existe"
            );
        }

        const content =
            fs.readFileSync(
                filepath,
                "utf-8"
            );

        const parsed =
            JSON.parse(
                content
            );

        return {

            success: true,

            action:
                "backup_restored",

            filename,

            restoredAt:
                new Date(),

            data:
                parsed,
        };
    }

    /*
    |--------------------------------------------------------------------------
    | Get Backups
    |--------------------------------------------------------------------------
    */

    async getBackups() {

        this.ensureDirectory();

        const files =
            fs.readdirSync(
                this.BACKUP_DIR
            );

        return files.map(

            (file) => {

                const filePath =
                    path.join(

                        this.BACKUP_DIR,

                        file
                    );

                const stats =
                    fs.statSync(
                        filePath
                    );

                return {

                    name: file,

                    path: filePath,

                    size:
                        stats.size,

                    sizeMB:
                        (
                            stats.size /
                            1024 /
                            1024
                        ).toFixed(2),

                    createdAt:
                        stats.birthtime,

                    updatedAt:
                        stats.mtime,
                };
            }
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Backup
    |--------------------------------------------------------------------------
    */

    async deleteBackup(filename) {

        this.ensureDirectory();

        if (!filename) {

            throw new Error(
                "El nombre del archivo es requerido"
            );
        }

        const filepath =
            path.join(

                this.BACKUP_DIR,

                filename
            );

        if (
            !fs.existsSync(
                filepath
            )
        ) {

            throw new Error(
                "El backup no existe"
            );
        }

        fs.unlinkSync(
            filepath
        );

        return {

            success: true,

            action:
                "backup_deleted",

            filename,

            deletedAt:
                new Date(),
        };
    }
}

module.exports =
    new BackupRepository();