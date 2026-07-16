// modules/database/utils/format-database-size.js

/*
|--------------------------------------------------------------------------
| Format Database Size
|--------------------------------------------------------------------------
|
| Convierte bytes a:
| KB, MB, GB, TB
|
*/

function formatDatabaseSize(bytes) {

  if (!bytes || bytes === 0) {

    return "0 Bytes";
  }

  const sizes = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
  ];

  const i = Math.floor(
    Math.log(bytes) /
        Math.log(1024),
  );

  const value =
        bytes / Math.pow(1024, i);

  return `${value.toFixed(2)} ${sizes[i]}`;
}

module.exports =
    formatDatabaseSize;
