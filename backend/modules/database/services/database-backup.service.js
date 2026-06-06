// modules/database/services/database-backup.service.js

const fs = require("fs");

const path = require("path");

const {
    spawn,
} = require("child_process");

/*
|--------------------------------------------------------------------------
| PostgreSQL Binary
|--------------------------------------------------------------------------
|
| Windows  -> Ruta real pg_dump.exe
| Linux    -> pg_dump
| Docker   -> pg_dump
|
*/

const PG_DUMP_PATH =

    process.platform === "win32"

        ? "C:/Program Files/PostgreSQL/17/bin/pg_dump.exe"

        : "pg_dump";

/*
|--------------------------------------------------------------------------
| Backup Directory
|--------------------------------------------------------------------------
*/

const BACKUP_DIR = path.join(

    process.cwd(),

    "storage",

    "backups"
);

/*
|--------------------------------------------------------------------------
| Ensure Backup Directory
|--------------------------------------------------------------------------
*/

if (
    !fs.existsSync(
        BACKUP_DIR
    )
) {

    fs.mkdirSync(

        BACKUP_DIR,

        {
            recursive: true,
        }
    );
}

class DatabaseBackupService {

    /*
    |--------------------------------------------------------------------------
    | Create Real PostgreSQL Backup
    |--------------------------------------------------------------------------
    */

    async createBackup() {

        return new Promise(

            async (
                resolve,
                reject
            ) => {

                try {

                    /*
                    |--------------------------------------------------------------------------
                    | Database URL
                    |--------------------------------------------------------------------------
                    */

                    const databaseUrl =
                        process.env
                            .DIRECT_URL;

                    if (!databaseUrl) {

                        return reject(

                            new Error(
                                "DIRECT_URL no configurado"
                            )
                        );
                    }

                    /*
                    |--------------------------------------------------------------------------
                    | Generate Filename
                    |--------------------------------------------------------------------------
                    */

                    const timestamp =
                        new Date()

                            .toISOString()

                            .replace(
                                /[:.]/g,
                                "-"
                            );

                    const filename =
                        `backup-${timestamp}.sql`;

                    const filepath =
                        path.join(

                            BACKUP_DIR,

                            filename
                        );

                    /*
                    |--------------------------------------------------------------------------
                    | pg_dump Arguments
                    |--------------------------------------------------------------------------
                    */

                    const args = [

                        databaseUrl,

                        "--no-owner",

                        "--no-privileges",

                        "--format=plain",

                        "--verbose",

                        `--file=${filepath}`,
                    ];

                    /*
                    |--------------------------------------------------------------------------
                    | Debug Logs
                    |--------------------------------------------------------------------------
                    */

                    console.log(
                        "PG_DUMP_PATH:"
                    );

                    console.log(
                        PG_DUMP_PATH
                    );

                    console.log(
                        "ARGS:"
                    );

                    console.log(
                        args
                    );

                    /*
                    |--------------------------------------------------------------------------
                    | Execute pg_dump
                    |--------------------------------------------------------------------------
                    */

                    const dumpProcess =
                        spawn(

                            PG_DUMP_PATH,

                            args,

                            {
                                shell: false,
                            }
                        );

                    let stdout =
                        "";

                    let stderr =
                        "";

                    /*
                    |--------------------------------------------------------------------------
                    | STDOUT
                    |--------------------------------------------------------------------------
                    */

                    dumpProcess.stdout.on(

                        "data",

                        (data) => {

                            stdout +=
                                data.toString();
                        }
                    );

                    /*
                    |--------------------------------------------------------------------------
                    | STDERR
                    |--------------------------------------------------------------------------
                    */

                    dumpProcess.stderr.on(

                        "data",

                        (data) => {

                            stderr +=
                                data.toString();
                        }
                    );

                    /*
                    |--------------------------------------------------------------------------
                    | Process Error
                    |--------------------------------------------------------------------------
                    */

                    dumpProcess.on(

                        "error",

                        (error) => {

                            console.error(
                                "PROCESS ERROR:"
                            );

                            console.error(
                                error
                            );

                            reject({

                                success: false,

                                message:
                                    error.message,

                                error:
                                    "BACKUP_PROCESS_ERROR",

                                timestamp:
                                    new Date(),
                            });
                        }
                    );

                    /*
                    |--------------------------------------------------------------------------
                    | Process Close
                    |--------------------------------------------------------------------------
                    */

                    dumpProcess.on(

                        "close",

                        async (
                            code
                        ) => {

                            /*
                            |--------------------------------------------------------------------------
                            | Logs
                            |--------------------------------------------------------------------------
                            */

                            console.log(
                                "STDOUT:"
                            );

                            console.log(
                                stdout
                            );

                            console.log(
                                "STDERR:"
                            );

                            console.log(
                                stderr
                            );

                            /*
                            |--------------------------------------------------------------------------
                            | Validate Exit Code
                            |--------------------------------------------------------------------------
                            */

                            if (
                                code !== 0
                            ) {

                                return reject({

                                    success: false,

                                    message:

                                        stderr ||

                                        `pg_dump terminó con código ${code}`,

                                    error:
                                        "BACKUP_CREATE_ERROR",

                                    timestamp:
                                        new Date(),
                                });
                            }

                            /*
                            |--------------------------------------------------------------------------
                            | Validate File
                            |--------------------------------------------------------------------------
                            */

                            if (
                                !fs.existsSync(
                                    filepath
                                )
                            ) {

                                return reject({

                                    success: false,

                                    message:
                                        "El archivo backup no fue creado",

                                    error:
                                        "BACKUP_FILE_NOT_FOUND",

                                    timestamp:
                                        new Date(),
                                });
                            }

                            const stats =
                                fs.statSync(
                                    filepath
                                );

                            if (
                                stats.size === 0
                            ) {

                                return reject({

                                    success: false,

                                    message:
                                        "El backup está vacío",

                                    error:
                                        "BACKUP_EMPTY",

                                    timestamp:
                                        new Date(),
                                });
                            }

                            /*
                            |--------------------------------------------------------------------------
                            | Backup Data
                            |--------------------------------------------------------------------------
                            */

                            const backup = {

                                filename,

                                filepath,

                                size:
                                    stats.size,

                                createdAt:
                                    new Date(),
                            };

                            /*
                            |--------------------------------------------------------------------------
                            | Success
                            |--------------------------------------------------------------------------
                            */

                            resolve({

                                success: true,

                                message:
                                    "Backup creado correctamente",

                                backup,

                                file: {

                                    filename,

                                    filepath,

                                    size:
                                        stats.size,
                                },

                                timestamp:
                                    new Date(),
                            });
                        }
                    );

                } catch (error) {

                    reject({

                        success: false,

                        message:
                            error.message,

                        error:
                            "BACKUP_UNKNOWN_ERROR",

                        timestamp:
                            new Date(),
                    });
                }
            }
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Get Backups
    |--------------------------------------------------------------------------
    */

    async getBackups() {

        try {

            const files =
                fs.readdirSync(
                    BACKUP_DIR
                );

            const backups =
                files.map(

                    (file) => {

                        const filePath =
                            path.join(

                                BACKUP_DIR,

                                file
                            );

                        const stats =
                            fs.statSync(
                                filePath
                            );

                        return {

                            name: file,

                            path:
                                filePath,

                            size:
                                stats.size,

                            createdAt:
                                stats.birthtime,

                            updatedAt:
                                stats.mtime,
                        };
                    }
                );

            backups.sort(

                (a, b) =>

                    new Date(
                        b.createdAt
                    ) -

                    new Date(
                        a.createdAt
                    )
            );

            return {

                success: true,

                total:
                    backups.length,

                backups,

                timestamp:
                    new Date(),
            };

        } catch (error) {

            throw error;
        }
    }
}

module.exports =
    new DatabaseBackupService();