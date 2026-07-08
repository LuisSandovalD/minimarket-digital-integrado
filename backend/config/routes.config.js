const path = require("path");
const fs = require("fs");

module.exports = (app) => {
  const modulesPath = path.join(__dirname, "..", "modules");

  const routeNameOverrides = {
    productBarcode: "barcodes",
    userNotifications: "user-notifications",
    exportsPdf: "exports-pdf",
  };

  fs.readdirSync(modulesPath)
    .filter((dir) => fs.statSync(path.join(modulesPath, dir)).isDirectory())
    .sort()
    .forEach((moduleDir) => {
      const moduleRoutesPath = path.join(modulesPath, moduleDir, "routes");

      if (!fs.existsSync(moduleRoutesPath)) {
        return;
      }

      fs.readdirSync(moduleRoutesPath)
        .filter((file) => file.endsWith(".js"))
        .sort()
        .forEach((file) => {
          try {
            const routeKey = path
              .basename(file, ".js")
              .replace(".routes", "")
              .replace(".route", "");

            const routeName = routeNameOverrides[routeKey] || routeKey
              .replace(/([a-z])([A-Z])/g, "$1-$2")
              .toLowerCase();

            const routePath = path.join(moduleRoutesPath, file);
            const route = require(routePath);

            if (typeof route !== "function") {
              console.error(`❌ ERROR EN RUTA: ${moduleDir}/${file}`);
              return;
            }

            app.use(`/api/${routeName}`, route);
            console.log(`✅ Ruta cargada: /api/${routeName}`);
          } catch (error) {
            console.error(`❌ Error cargando ${moduleDir}/${file}`);
            console.error(error.message);
          }
        });
    });
}; 